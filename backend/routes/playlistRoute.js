import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import * as playlistController from "../controllers/playlistController.js";

const router = express.Router();


//creating playlist
router.post("/create", isAuthenticated, playlistController.createPlaylist);

//get playlist by id
router.get("/playlist/:playlistId", isAuthenticated, playlistController.getPlaylistById);

//get playlist of artists
router.get("/artist/:playlistId", isAuthenticated, playlistController.getPlaylistByArtistId);

//add song to the playlist
router.post("/add/song", isAuthenticated, playlistController.addSongToPlaylist);

export default router;
