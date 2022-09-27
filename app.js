// const express = require("express");
const { User } = require('./models'); // import models
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require('express');

const { QueryTypes } = require('sequelize')
    // const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
const app = express(); // create a new express app
app.use(express.json());

app.get('/', function(req, res) {
    res.send('App running')
});

app.listen({ port: 5005 }, async() => {
    let user = await User.findAll({ id: 1 });
    console.log(user);
});
// const user = User.findAll();

// console.log(JSON.stringify(user));