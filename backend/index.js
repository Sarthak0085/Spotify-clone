import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from "./routes/authRoute.js";
import songRoutes from "./routes/songRoute.js";
import playlistRoutes from "./routes/playlistRoute.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

//connecting mongodb
connectDB();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
}));
app.use(cors());
app.use(cookieParser());

//api testing
app.get("/", (req, res) => {
    res.send("Testing api");
});

//auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/song", songRoutes);
app.use("/api/playlist", playlistRoutes);

// port running check
app.listen(port, () => {
    console.log(`App is running on the port ${port}`);
});