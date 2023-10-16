import Playlist from "../models/playlistModel.js";
import User from "../models/userModel.js";
import Song from "../models/songModel.js";

//creating playlist
const createPlaylist = async (req, res) => {
    const { name, thumbnail, songs } = req.body;
    const owner = req.user?._id;
    try {
        //creating song
        const Playlist = await Playlist.create(
            name,
            thumbnail,
            songs,
            owner,
        );
        res.status(201).json({
            success: true,
            Playlist
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            err: error.message,
        });
    }
}

//get playlist by id
const getPlaylistById = async (req, res) => {
    try {
        //getting playlist id from req.params
        const playlistId = req.params.playlistId;

        //find playlist by playlist id
        const playlist = await Playlist.findOne({ _id: playlistId });

        //if not find
        if (!playlist) {
            res.status(301).json({
                success: false,
                err: "Playlist doesn't Exist."
            });
        }

        //else send data
        res.status(200).json({
            success: true,
            playlist,
        })
    } catch (error) {
        res.status(403).json({
            success: false,
            err: error.message,
        });
    }
}

//get playlist of artist
const getPlaylistByArtistId = async (req, res) => {
    try {
        //getting playlist id from req.params
        const artistId = req.params.artistId;

        //find artist by artist id
        const artist = await User.findOne({ _id: artistId });

        //if not find artist then send error invalid id
        if (!!artist) {
            res.status(301).json({
                success: false,
                err: "Invalid id"
            });
        }

        const playlists = await Playlist.find({ owner: artistId });

        //else send data
        res.status(200).json({
            success: true,
            playlists,
        })
    } catch (error) {
        res.status(403).json({
            success: false,
            err: error.message,
        });
    }
}


//add song to the playlist
const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        //get current user from req.user
        const currentUser = req.user._id;
        
        //find playlist by id
        const playlist = await Playlist.findOne({ _id: playlistId });
        //if playlist doesn't exist then send error
        if (!playlist) {
            res.status(304).json({
                success: false,
                err: "Playlist doesn't Exist."
            });
        }

        //check if current user is not an owner nor collaborator then they are not allowed to add song to playlist
        if (!playlist.owner.equals(currentUser) && !playlist.collaborators.includes(currentUser)) {
            res.status(400).json({
                success: false,
                err: "Not Allowed."
            });
        }

        //find the song
        const song = await Song.findOne({ _id: songId });
        // if song doesn't exist then send error
        if (!song) {
            res.status(304).json({
                success: false,
                err: "Song doesn't Exist."
            });
        }

        // now all the conditions matched that required then add song into playlist
        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json({
            success: true,
            playlist,
        })
    } catch (error) {
        res.status(403).json({
            success: false,
            err: error.message,
        });
    }
}

export {
    createPlaylist,
    getPlaylistById,
    getPlaylistByArtistId,
    addSongToPlaylist
}