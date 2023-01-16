import User from "../model/UserModel";
import Token from "../model/TokenModel";
import express from "express";
import Post from '../model/PostModel';

export const profile = async (req: express.Request, res: express.Response) => {
  const cookies = req.cookies;
  
  if (!cookies?.token) return res.status(401).json({ error: "error no cookies" });
  
  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({ refreshToken: refreshToken }).exec();
  const foundUser = await User.findById(foundToken?.userId);
  
  if (!foundUser) return res.status(403).json({ error: "error user not found" });
  
  res.status(200).json({ user: foundUser });
};

export const getUserPosts = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  
  try {
    const posts = await Post.find({ userId: id });

    if (posts.length == 0) return res.status(400).json({ message: "No content" });

    res.status(200).json({ posts: posts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
