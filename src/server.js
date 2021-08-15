import express from "express";

const app = express();

// set view engine by pug
app.set("view engine", "pug");
// tell express where are templates
app.set("views", __dirname + "/views");

// do static
// create public url to share some files to users
// when user goes to /public, show __dirname + "/public" folder
app.use("/public", express.static(__dirname + "/public"));

// render a view
// create route hanlder which renders home.pug
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log("Listening on http://localhost:3000")
app.listen(3000, handleListen);