import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// REGISTER USER
export const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // validation

    if (!name || !email || !password) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }


    // check existing user

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }


    // hash password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);


    // create user

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });


    // generate token

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );


    res.status(201).json({

      message: "User registered successfully",

      token,

      user

    });

  }

  catch (error) {

    res.status(500).json({

      message: "Registration failed",

      error: error.message

    });

  }

};



// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};