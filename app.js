const account = require("./account.json");
// require packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

// template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting body parser
app.use(bodyParser.urlencoded({ extended: true }));

// routing
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  // console.log(req.body);
  const input = req.body;
  const email_input = input.email;
  const password_input = input.password;
  const account_info = account.info.find(user => user.email === email_input);
  if (
    email_input === account_info.email &&
    password_input === account_info.password
  ) {
    res.render("show", { account_info });
  } else {
    res.render("input_error");
  }
});

// listen to port
app.listen(port, () => {
  console.log(`Express app is listening on port ${port}`);
});
