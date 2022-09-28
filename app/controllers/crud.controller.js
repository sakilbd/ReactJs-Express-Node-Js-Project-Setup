const model = require("../../models");
const User = model.User;
// const Op = model.Sequelize.Op;
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require('express');
const circularJSON = require('circular-json');
var bodyParser = require('body-parser');
var apiResponse = require('./apiResponser');


// Create and Save a new Tutorial
exports.create = (req, res, next) => {
    // res.text(circularJSON.parse(req.body))
    // res.send(req.body);
    // if (!req.body.firstName) {
    //     res.status(400).send({
    //         message: "Content can not be empty!",
    //     });
    //     return;
    // }

    // Create a Tutorial
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };


    // Save Tutorial in the database
    User.create(user)
        .then((data) => {

            res.send(apiResponse.sucessResponse(200, "User Created", data));
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial.",
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    console.log("inside Find All");
    // return "wow";
    // const firstName = req.query.FirstName;
    // var condition = title ? {
    //     title: {
    //         [Op.like]: `%${title}%`
    //     }
    // } : null;

    User.findAll()
        .then((data) => {
            // res.send(data);
            res.send(apiResponse.sucessResponse(200, "All User Data", data));
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};