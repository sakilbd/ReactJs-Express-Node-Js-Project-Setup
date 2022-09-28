//for Passport auths added dependencies 

const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');

//for Passport auths added dependencies 

const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
var corsOptions = {
    origin: "http://localhost:8081"
};
require("./app/routes/crud.routes")(app);

//for Passport auths added dependencies 

app.use(bodyParser.json());

//for Passport auths added dependencies 



app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });



// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });

// set port, listen for requests
console.log(process.env.PORT);
const PORT = process.env.PORT || 8080;



//#####for Passport auths added dependencies#######
// Handling Errors


app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});
//#####for Passport auths added dependencies######
// app.post('/post', function(request, res) {
//     console.log(request.body)
//     res.send(request.body) //you will get your data in this as object.
// })
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});