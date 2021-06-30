const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8000;
const requests = require("requests");
const eath = path.join(__dirname,"../templates/views");
const ppath = path.join(__dirname , "../templates/partials");

app.set("view engine", "hbs");
app.set('views', eath);
hbs.registerPartials(ppath);
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/movie", (req, res) => {
    requests("https://movies-list-hob.herokuapp.com/movies")
    .on('data', function (chunk)  {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        res.send(arrData);
    })
    .on('end', function (err)  {
      if (err) return console.log('connection closed due to errors', err);
      res.end();
    });
});

app.get("/login", (req, res) => {
   res.render("login");
})

app.get("/about", (req, res) => {
    res.render("about");
 })


app.get("*", (req, res) => {
    res.send("404 error page bro");
})

app.listen(port , () => {
    console.log("listening");

})