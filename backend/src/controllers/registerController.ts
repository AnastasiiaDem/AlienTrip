import User from "../model/UserModel";
import Token from "../model/TokenModel";
const bcrypt = require("bcryptjs");
import express from "express";
import mongoose from "mongoose";

const createUser = async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, email, password, birthDate } = req.body;

  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ message: `Properties are required` });

  if (await User.findOne({ email: email }).exec())
    return res.status(409).json({ message: `User with such email (${email}) exists` });

  const hashPassword = await bcrypt.hashSync(password, 8);
  const id = new mongoose.Types.ObjectId();

  const newUser = new User({
    _id: id,
    name: {
      firstName: firstName,
      lastName: lastName,
    },
    birthDate: birthDate,
    email: email,
    password: hashPassword,
  });

  const userToken = new Token({
    userId: id,
    refreshToken: "",
    requestedTime: Date.now(),
  });

  newUser.save((err, data) => {
    if (err) return res.status(500).json({ error: err });
  });

  userToken.save((err, data) => {
    if (err) res.status(500).json({ error: err });
    return res.status(200).json({ message: "User is registered", data: data });
  });
};

export default createUser;
