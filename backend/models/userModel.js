import mongoose from "mongoose";

// creating user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please enter your first name."],
      maxLength: 30,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please enter your last name."],
      maxLength: 30,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "E-mail is required"],
      unique: true,
      match: [
        /^\w+([\.-]?w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/,
        "Please add a valid Email",
      ],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "Please enter your username."],
      maxLength: 30,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minLength: [8, "Password must have atleast 8 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
        "Password must contain atleast one uppercase, lowercase character, digit and special character",
      ],
    },
    likedSongs: {
      type: String,
      default: "",
    },
    likedPlaylists: {
      type: String,
      default: "",
    },
    subscribedArtists: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// exporting user schema
export default mongoose.model("User", userSchema);
