const sql = require("./db.js");

// constructor
const Todo = function(ToDo) {
    this.id = ToDo.id;
    this.todo = ToDo.todo;
    this.date = ToDo.date;
    this.notiz = ToDo.notiz;
};

Todo.create = (newTodo, result) => {
    sql.query("INSERT INTO todos SET ?", newTodo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created todo: ", { id: res.insertId, ...newTodo });
        result(null, { id: res.insertId, ...newTodo });
    });
};

Todo.findById = (todoId, result) => {
    sql.query(`SELECT * FROM todos WHERE id = ${todoId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found todo: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Member with the id
        result({ kind: "not_found" }, null);
    });
};

Todo.getAll = result => {
    sql.query("SELECT * FROM todos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("todos: ", res);
        result(null, res);
    });
};

Todo.updateById = (Id, toDo, result) => {
    sql.query(
        "UPDATE todos SET id = ?,todo = ?, date = ?, notiz = ?  WHERE Id = ?",
        [toDo.id, toDo.todo, toDo.date, toDo.notiz, Id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated todo: ", { id: Id, ...toDo });
            result(null, { Id: Id, ...toDo });
        }
    );
};

Todo.remove = (id, result) => {
    sql.query("DELETE FROM todos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Member with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted member with id: ", id);
        result(null, res);
    });
};

Todo.removeAll = result => {
    sql.query("DELETE FROM todos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} todos`);
        result(null, res);
    });
};

module.exports = Todo;
