// app.js

const express = require("express");
const PORT = 3000;
const app = express();

// Set up for views
app.set("view engine", "ejs");
app.set("views", "./views");

// Set up for static files
app.use(express.static('public'));

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
    res.render("terminal.ejs");
}) 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})