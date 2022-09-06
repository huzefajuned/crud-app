const express = require("express");
const router = express.Router();
const userSchema = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = "ThisisSecretKeyOkkkk";

//USER SIGNUP CONTROLLERS
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).send({ message: "fields required" });
    }
    const oldUser = await userSchema.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).send({ message: "User Exists" });
    }
    //HASHING PASSWORD  USING BCRYPTJS....
    const securedPassword = await bcrypt.hashSync(password, 10);
    const user = await userSchema.create({
      name,
      email,
      password: securedPassword,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

const signIn = async (req, res) => {
  // res.send("singnin routes");
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "fields required" });
    }
    const oldUser = await userSchema.findOne({ email });
    console.log("oldUser is", oldUser);

    if (!oldUser) {
      return res.status(400).json({ message: "user doesn't exisits" });
    }
    const checkPassword = await bcrypt.compareSync(password, oldUser.password);
    console.log("checkPassword is", checkPassword);
    if (!checkPassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      secretKey,
      { expiresIn: "1hr" }
    );
    res.status(201).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    // console.log(error);
  }
};

module.exports = { signIn, signUp };
