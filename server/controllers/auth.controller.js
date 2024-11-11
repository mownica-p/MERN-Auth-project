import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; //Extracting User Data

  const hashedPassword = bcryptjs.hashSync(password, 10); //Hashing the Password
  const newUser = new User({ username, email, password: hashedPassword }); //Creating a New User Instance
  //Saving the User in the Database
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" }); //Sending the Response
  } catch (error) {
    next(error);
  }
};
