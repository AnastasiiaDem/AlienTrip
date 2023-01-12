import User from "../model/UserModel";
const bcrypt = require("bcryptjs");
import express from "express";

const createUser = async (req: express.Request, res: express.Response) => {
  console.log(req);
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ message: `Properties are required` });

  if (await User.findOne({ email: email }).exec())
    return res.status(409).json({ message: `User with such email (${email}) exists` });

  const hashPassword = await bcrypt.hashSync(password, 8);

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashPassword,
    refreshToken: "",
  });

  newUser.save((err, data) => {
    if (err) return res.status(500).json({ error: err });

    return res.status(200).json({ message: "User is registered", data: data });
  });
};

export default createUser;
