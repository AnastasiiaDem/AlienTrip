const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import express from "express";
import process from "process";
import User from "../model/UserModel";
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const loginUser = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) return res.status(400).json({ message: `Incorrect password or email` });

  const foundUser = await User.findOne({ email: email }).exec();
  console.log(foundUser);

  if (!foundUser) return res.status(409).json({ message: `Incorrect password or email` });

  const validPassword = await bcrypt.compare(password, foundUser.password);

  if (validPassword) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign(
      {
        UserData: {
          email: foundUser.email,
          roles: roles,
        },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );

    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    User.findOne({ email: foundUser.email }, function (err: Error, user: any) {
      if (err) return res.status(400).json({ error: err });

      if (user) {
        user.refreshToken = refreshToken;
        user.save((err: Error) => {
          if (err) return res.status(400).json({ error: err });
        });
      }
    });

    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    console.log(refreshToken);
    res.status(200).json({ message: "Authorizated", roles, accessToken });
  } else {
    res.status(400).json({ message: `Incorrect password or email` });
  }
};

export default loginUser;
