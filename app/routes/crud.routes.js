module.exports = (app) => {
    const users = require("../controllers/crud.controller.js");

    var router = require("express").Router();
    var bodyParser = require("body-parser");



    // Create a new Tutorial
    router.post("/create", users.create);

    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve all published users
    // router.get("/published", users.findAllPublished);

    // // Retrieve a single Tutorial with id
    // router.get("/:id", users.findOne);

    // // Update a Tutorial with id
    // router.put("/:id", users.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", users.delete);

    // // Delete all users
    // router.delete("/", users.deleteAll);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api/users", router);
};