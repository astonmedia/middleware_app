const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const port = process.env.PORT || 8000;

app.use(function (req, res, next) {
  console.log("REQUEST Date " + new Date());
  next();
});

app.use(function (req, res, next) {
  const filepath = path.join(__dirname, "static", req.url);
  fs.stat(filepath, function (err, fileInfo) {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      res.sendFile(filepath);
    } else {
      next();
    }
  });
});

app.use(function (req, res) {
  res.status(404).send("File Not Found");
});

app.listen(port, () =>
  console.log(`Server started on port: http://localhost:${port}`)
);
