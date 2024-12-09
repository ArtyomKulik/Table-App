/* eslint-disable no-unused-vars */
"use strict";
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     queryInterface.bulkInsert("Users", [
      {
        username: "Админ",
        email: "admin@example.com",
        password: await bcrypt.hash("123", 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Редактор текста",
        email: "text@example.com",
        password: await bcrypt.hash("123", 10),
        role: 'textEditor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Редактор ссылок",
        email: "link@example.com",
        password: await bcrypt.hash("123", 10),
        role: 'linkEditor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);



    return queryInterface.bulkInsert("Tables", [
      {
        text: "Racoons photo",
        link: "https://avatars.mds.yandex.net/i?id=7b17c3fdaf60d9f551607764a9a030439d967941bf39164b-12439486-images-thumbs&n=13",
        createdAt: new Date(),
        updatedAt: new Date(Date.now() - 5000),
      },
      {
        text: "",
        link: "https://i.pinimg.com/736x/d9/79/28/d97928cf00127a7560fc70f183fe9363.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "Cute cat",
        link: "https://avatars.mds.yandex.net/i?id=1cc8be2cf37c83e1e39c8033147db1929f6027d7-10511855-images-thumbs&n=13",
        createdAt: new Date(),
        updatedAt:  new Date(Date.now() - 40000),
      },
      {
        text: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
