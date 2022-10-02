const model = require("../../models");
const User = model.User;
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const circularJSON = require("circular-json");
var bodyParser = require("body-parser");
var apiResponse = require("./apiResponser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // res.text(circularJSON.parse(req.body))
    // res.send(req.body);
    // if (!req.body.firstName) {
    //     res.status(400).send({
    //         message: "Content can not be empty!",
    //     });
    //     return;
    // }

    // Create a User


    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send({
                msg: err,
            });
        } else {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
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
        }
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
    // if (!req.headers.authorization ||
    //     !req.headers.authorization.startsWith("Bearer") ||
    //     !req.headers.authorization.split(" ")[1]
    // ) {
    //     return res.status(422).json({
    //         message: "Please provide the token",
    //     });
    // }
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

exports.login = (req, res) => {
    const email = req.body.email;
    console.log(email);
    console.log(req.body.password);

    User.findOne({
            where: {
                email: email
            }
        }).then(data => {
            if (data) {
                // res.send(JSON.stringify(data.id));
                bcrypt.compare(
                    req.body.password,
                    data.password,
                    (bErr, bResult) => {
                        // wrong password
                        if (bErr) {
                            throw bErr;
                            return res.status(401).send({
                                msg: "Email or password is incorrect!",
                            });
                        }
                        if (bResult) {
                            const token = jwt.sign({ id: JSON.stringify(data.id) },
                                "the-super-strong-secrect", { expiresIn: "1h" }
                            );
                            // db.query(
                            //     `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                            // );
                            return res.status(200).send({
                                msg: "Logged in!",
                                token,
                                user: data,
                            });
                        }
                        return res.status(401).send({
                            msg: "Username or password is incorrect!",
                        });
                    }
                );
            } else {
                res.status(404).send({
                    message: `Cannot find User with email=${email}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving User with email=" + email
            });
        });

}

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