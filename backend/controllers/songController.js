import User from "../models/userModel.js";
import Song from "../models/songModel.js";


//creating song
const createSong = async (req, res) => {
    const { title, thumbnail, track } = req.body;
    const artist = req.user?._id;
    try {
        //creating song
        const song = await Song.create(
            req.body,
            artist
        );
        res.status(201).json({
            success: true,
            song
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            err: error.message,
        });
    }
}


// get all songs of me
const getAllSongsOfMe = async (req, res) => {
    try {
        //getting all the songs where artist is logined user and getting latest song on top
        const songs = await Song.find({ artist: req.user?._id }).sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            songs
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            err: error.message,
        });
    }
}

//get all songs by artist name
const getAllSongsByArtist = async (req, res) => {
    const { artistId } = req.params;
    try {
        // check if artist exist
        const artist = await User.findOne({ _id: artistId });
        //if not find
        if (!artist) {
            res.status(301).json({
                success: false,
                err: "Artist doesn't exist",
            });
        }

        // if artist exist then find its all songs
        const songs = await Song.find({ artist: artistId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            songs
        })

    } catch (error) {
        res.status(403).json({
            success: false,
            err: error.message,
        });
    }
}

//get all songs by artist name
const getSongByName = async (req, res) => {
    const { songname } = req.params;
    try{
        // find song by name
        const song = await Song.findOne({ title: songname });
        res.status(200).json({
            success: true,
            song
        })

    } catch (error) {
        res.status(403).json({
            success: false,
            err: error.message,
        });
    }
}



export {
    createSong,
    getAllSongsOfMe,
    getAllSongsByArtist,
    getSongByName
}