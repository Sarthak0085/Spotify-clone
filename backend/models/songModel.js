import mongoose from "mongoose";

const { objectId } = mongoose.Schema.Types;

// creating song schema
const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Song Title is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    track: {
      type: String,
      required: [true, "Please add the track"],
    },
    artist: {
      type: objectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Song", songSchema);
