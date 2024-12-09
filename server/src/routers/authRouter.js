const express = require("express");

const bcrypt = require("bcrypt");
const { User } = require("../../db/models");
const generateTokens = require("../utils/generateTokens");
const cookieConfig = require("../configs/cookie.config");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: "Не все поля заполнены" });
  }

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { username, password: await bcrypt.hash(password, 10) },
    });

    if (!created) {
      return res.status(400).json({ error: "Пользователь уже существует" });
    }
    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    res
      .cookie("refreshToken", refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Не все поля заполнены" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Неверный логин или пароль" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Неверный логин или пароль" });
    }

    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    res
      .cookie("refreshToken", refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка" });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("refreshToken").sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
