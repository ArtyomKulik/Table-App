const express = require("express");
const { Table } = require("../../db/models");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const allTableData = await Table.findAll();
    res.status(200).json(allTableData);
  } catch (error) {
    res.status(500).json(`Ошибка ${error}`);
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const getTableRow = await Table.findByPk(id);
      res.status(200).json(getTableRow);
    } catch (error) {
      res.status(500).json(`Ошибка: ${error}`);
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { text, link } = req.body;

      // eslint-disable-next-line no-unused-vars
      const updateCell = await Table.update({ text, link }, { where: { id } });

      const findCell = await Table.findByPk(id);
      res.json(findCell);
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router;
