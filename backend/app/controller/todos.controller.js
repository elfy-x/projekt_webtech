const Todo = require("../model/todos.model.js");


exports.registerAction = async function(request, response) {
    console.log('registerAction');
    console.log(request.body);
    model.register((request, response)).then(
        data => {
            console.log('loginAction');
            console.log(data);
            response.send(data);
        },
        error => response.send(error),
    );
}

exports.loginAction = async function(request, response) {
    console.log('loginAction');
    console.log(request.body);
    model.login((request, response)).then(
        data => {
            console.log('loginAction');
            console.log(data);
            response.send(data);
        },
        error => response.send(error),
    );
}








// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Member
    const todo = new Todo({
        todo: req.body.todo,
        id: req.body.id,
        date: req.body.date,
        notiz: req.body.notiz
    });

    // Save Customer in the database
    Todo.create(todo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Todo."
            });
        else res.send(data);
    });
};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    Todo.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todos."
            });
        else res.send(data);
    });
};

// Find a single Member with a memberId
exports.findOne = (req, res) => {
    Todo.findById(req.params.todoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Todo with id ${req.params.todoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Todo with id " + req.params.todoId
                });
            }
        } else res.send(data);
    });
};
// Update a Member identified by the memberId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Todo.updateById(
        req.params.todoId,
        new Todo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Todo with id ${req.params.todoId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Todo with id " + req.params.todoId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Member with the specified memberId in the request
exports.delete = (req, res) => {
    Todo.remove(req.params.todoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Member with id ${req.params.todoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Member with id " + req.params.todoId
                });
            }
        } else res.send({ message: `Member was deleted successfully!` });
    });
};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
    Todo.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all members."
            });
        else res.send({ message: `All Members were deleted successfully!` });
    });
};
