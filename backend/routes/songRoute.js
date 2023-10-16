import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import * as songController from "../controllers/songController.js";



const router = express.Router();

//create song route
router.post("/create", isAuthenticated, songController.createSong);

//get all songs of me route
router.get("/mysongs", isAuthenticated, songController.getAllSongsOfMe);

//get all songs of artist route
router.get("/artist/:artistId", isAuthenticated, songController.getAllSongsByArtist);

//get all songs by songname route
router.get("name/:songname", isAuthenticated, songController.getSongByName);


export default router;