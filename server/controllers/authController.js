const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bycrypt = require("bcryptjs");

// signup controller

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, message: "User created successfully" });
  } catch (error) {
    console.log(`Error come in signup route: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login controller

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token,message:"User logged in successfully" });
  } catch (error) {
    console.log(`Error come in login route: ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// forgotpass controller

const forgotpass = async (req, res) =>{
  const { email } = req.body;
  try {
    const generateOtp = Math.floor(Math.random() * 90000); // 4 digit OTP

    const info = await sendMail({email, generateOtp});
    console.log(info.messageId);
    if(info.messageId){
      let user = await User.findOneAndUpdate(
        {email},
        {otp: generateOtp},
        {new: true}
      );

      if(!user){
        return res.status(400).json({message: "User does not exist"});
      }
    }
    return res.status(200).json({message:"OTP sent successfully!"});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

// verify otp and set new password 
const verifyotp = async (req, res) =>{
  const { otp, newpassword} = req.body;
  
  try {
    let user = await User.findOne({ otp });
    if(!user){
      return res.status(400).json({message:"Invalid OTP"});
    }

    const securePassword = await bycrypt.hash(newpassword, 10);
    user = await User.findOneAndUpdate(
      {otp},
      {password: securePassword, otp:0},
      {new:true}
    );
    return res.status(200).json({message: "Password updated successfully!"});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
module.exports = { signup, login, forgotpass, verifyotp };