import mongoose from "mongoose";

const { objectId } = mongoose.Schema.Types;

// creating song schema
const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the song title"],
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: objectId,
        ref: "user",
    },
});

export default mongoose.model("Song", songSchema);