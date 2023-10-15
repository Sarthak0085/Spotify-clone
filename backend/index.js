import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

//connecting mongodb
connectDB();

//api testing
app.get("/", (req, res) => {
    res.send("Testing api");
});

app.use("auth", authRoute);

// port running check
app.listen(port, () => {
    console.log(`App is running on the port ${port}`);
});