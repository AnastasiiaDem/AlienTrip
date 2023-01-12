import express from "express";
import User from "../model/UserModel";

const logoutUser = async (req: express.Request, res: express.Response) => {
  const cookies = req.cookies;

  if (!cookies.token) return res.status(204).json({ error: "No token" });

  const refreshToken = cookies.token;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("token", { httpOnly: true, sameSite: "none", secure: true });
    return res.status(204).json({ error: "No token" });
  }

  User.findOne({ refreshToken: refreshToken }, function (err: Error, user: any) {
    if (err) return res.status(400).json({ error: err });

    if (user) {
      user.refreshToken = "";
      user.save((err: Error) => {
        if (err) return res.status(400).json({ error: err });
      });
    }
  });

  res.clearCookie("token", { httpOnly: true, sameSite: "none", secure: true });
  return res.status(204).json({ error: "No token" });
};

export default logoutUser;
