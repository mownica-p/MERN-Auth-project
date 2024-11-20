import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?ga=GA1.1.2082689087.1731448230&semt=ais_hybrid",
    },
  },
  { timestamps: true }
);

//const User = mongoose.model("User", userSchema);

// Check if the model already exists to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
