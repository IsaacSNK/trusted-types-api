const express = require("express");
const { expressCspHeader } = require('express-csp-header');
const bodyParser = require("body-parser");
const db = require("./src/api/database");
const app = express();

app.use(bodyParser.text());
app.use(express.static(__dirname + "/public/assets"));
app.use(expressCspHeader({
  directives: {
    'require-trusted-types-for': "'script'"
  }
}));



app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/todo", function (req, res) {
  db.query();
  res.send(db.query());
});

app.post("/api/todo", function (req, res) {
  const id = db.save(req.body);
  res.send(id);
});

app.patch("/api/todo/:id/complete", function (req, res) {
  db.update(req.params.id, "done");
  res.sendStatus(200);
});

// start the server in port 3000
app.listen(8080, function () {
  console.log("Server ready");
});
