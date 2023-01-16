import User from "../model/UserModel";
import Token from "../model/TokenModel";
import express from "express";
import Post from "../model/PostModel";

export const createPost = async (req: express.Request, res: express.Response) => {
  const { title, description, type, category, city, linkContacts } = req.body;

  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({ error: "error no cookies" });

  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({ refreshToken: refreshToken }).exec();
  const foundUser = await User.findById(foundToken?.userId);

  if (!foundUser) return res.status(403).json({ error: "error user not found" });

  if (!title || !description || !type || !category || !city)
    return res.status(400).json({ message: `Properties are required` });

  const newPost = new Post({
    userId: foundUser._id,
    title: title,
    description: description,
    type: type,
    categories: category,
    city: city,
    linkContacts: {
      instagram: linkContacts?.instagram,
      telegram: linkContacts?.telegram,
    },
  });

  newPost.save((err, data) => {
    if (err) res.status(500).json({ error: err });
    return res.status(200).json({ message: "Post is submitted", data: data });
  });
};

export const getPosts = async (req: express.Request, res: express.Response) => {
  const { title, type } = req.body;

  try {
    const posts = await Post.find({
      $or: [
        {
          title: { $regex: title },
        },
        { postType: { $regex: type } },
      ],
    });
    res.status(400).json({ data: posts });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
