const jwt = require("jsonwebtoken");
import express from "express";
import User from "../model/UserModel";
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const refreshToken = async (req: express.Request, res: express.Response) => {
  console.log(REFRESH_TOKEN_SECRET);
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({ error: "error no cookies" });

  const refreshToken = cookies.token;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) return res.status(403).json({ error: "error user not found" });

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: Error, data: any) => {
    if (err || foundUser.email !== data.email) return res.status(403).json({ error: "error" + err });

    const roles = Object.values(foundUser.roles);

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

    res.status(200).json({ message: "Refreshed", roles, accessToken });
  });
};

export default refreshToken;
