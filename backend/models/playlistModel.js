import mongoose from "mongoose";

const { objectId } = mongoose.Schema.Types;

// creating song schema
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: objectId,
        ref: "user"
    },
    songs: [
        {
            type: objectId,
            ref: "song",
        },
    ],
    collaborators: {
        type: objectId,
        ref: "user",
    },
});

export default mongoose.model("Playlist", playlistSchema);