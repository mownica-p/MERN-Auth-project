import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//Function to Sign up a New User
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

//Function to Sign in an Existing User
export const signin = async (req, res, next) => {
  const { email, password } = req.body; //Extracting User Data
  try {
    const validUser = await User.findOne({ email }); //Finding the User in the Database
    if (!validUser) return next(errorHandler(404, "User Not Found")); //Sending the Response(404);

    const validPassword = bcryptjs.compareSync(password, validUser.password); //Comparing the Password
    if (!validPassword) return next(errorHandler(401, "wrong credentials")); //Sending the Response(401);

    //Function to Generate a JWT Token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); //Setting the Expiry Date for the Token in 1 Hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
