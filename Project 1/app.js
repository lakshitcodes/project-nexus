const express = require("express");
const app = express();
const port = 8080;
const ejsMate = require("ejs-mate");
const path = require("path");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  res.render("pages/home.ejs");
});

app.get("/login", (req, res) => {
  res.render("pages/login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("pages/signup.ejs");
});

app.listen(port, () => {
  console.log(`Server Running at port : ${port}`);
});
