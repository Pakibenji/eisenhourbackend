const express = require("express");
const mysql = require("mysql");
const myConnection = require("express-myconnection");

const optionBd = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "tasks",
};

const app = express();
const port = 3000;

app.use(myConnection(mysql, optionBd, "pool"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query("SELECT * FROM task", (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.json(rows);
        }
      });
    }
  });
});


app.get("/:id", (req, res) => {
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        "SELECT * FROM task WHERE id = ?",
        [req.params.id],
        (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            res.json(rows);
          }
        }
      );
    }
  });
});


app.post("/", (req, res) => {
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        "INSERT INTO task (title, description) VALUES (?, ?)",
        [req.body.title, req.body.description],
        (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            res.json(rows);
          }
        }
      );
    }
  });
});

app.put("/:id", (req, res) => {
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        "UPDATE task SET title = ?, description = ?, status = ? WHERE id = ?",
        [req.body.title, req.body.description, req.body.status, req.params.id],
        (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            res.json(rows);
          }
        }
      );
    }
  });
});

app.delete("/:id", (req, res) => {
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        "DELETE FROM task WHERE id = ?",
        [req.params.id],
        (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            res.json(rows);
          }
        }
      );
    }
  });
});

app.listen(port, () => {
  console.log(`Attente des requêtes sur le port ${port}...`);
});
