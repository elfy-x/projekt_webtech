const loginController = require("../controller/loginController");
module.exports = app => {
    const todos = require("../controller/todos.controller.js");

    // Create a new Member
    app.post("/todos", todos.create);

    // GET all Members
    app.get("/todos", todos.findAll);

    // GET one single Member with memberId
    app.get("/todos/:todoId", todos.findOne);

    // Update one Member with memberId
    app.put("/todos/:todoId", todos.update);

    // Delete the Member with memberId
    app.delete("/todos/:todoId", todos.delete);

    // Delete all members
    app.delete("/todos", todos.deleteAll);

};
