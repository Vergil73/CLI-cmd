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

// CLI homepage
const terminalRouter = require("./routes/terminalRouter");
app.use("/", terminalRouter);

// api
const userRouter = require("./routes/usersRouter");
app.use("/", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})