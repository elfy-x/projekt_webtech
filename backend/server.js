const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const loginController= require('../backend/app/controller/loginController');
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// enable cors for all requests
app.use(cors());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello FIW!" });
});
require("./app/routes/todos.routes.js")(app);



app.get('/user', loginController.readAction);
app.get('/user/:id', loginController.readIdAction);
app.post('/user/login', loginController.loginAction);
app.post('/user/register', loginController.registerAction);



// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
