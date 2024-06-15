const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

const Feedback = require("./models/feedback.js");

const port = 8080;
const mongoUrl = "mongodb://127.0.0.1:27017/nexus";

main()
  .then(() => {
    console.log("Connection Established with the database.");
  })
  .catch((e) => {
    console.log(`Error : e`);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

const sessionOptions = {
  secret: "mysupersecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("pages/root.ejs", { currentRoute: "home" });
});

app.get("/feedback", (req, res) => {
  res.render("pages/feedback.ejs", { currentRoute: "feedback" });
});

app.get("/products", (req, res) => {
  res.render("pages/product.ejs", { currentRoute: "products" });
});

app.get("/about", (req, res) => {
  res.render("pages/about.ejs", { currentRoute: "about" });
});

app.post("/leave-feedback", async (req, res) => {
  const newFeedback = new Feedback(req.body.feedback);
  await newFeedback
    .save()
    .then(() => {
      req.flash("success", "Thank You for your feedback");
    })
    .catch((e) => {
      req.flash("error", "Error in saving feedback");
    });
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
