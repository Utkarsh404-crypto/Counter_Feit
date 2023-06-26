const express = require("express");
const app = require("express")();
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const { notFound, errors } = require("./middleware/error");
const cors = require("cors");

dotenv.config();
connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);

app.use(notFound);
app.use(errors);

const PORT = process.env.PORT || 8080;

const server = app.listen(`${PORT}`, () => {
    console.log(`Server listening at port ${PORT}`);
})