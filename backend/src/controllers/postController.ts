import User from "../model/UserModel";
import Token from "../model/TokenModel";
import express from "express";
import Post from "../model/PostModel";

export const createPost = async (req: express.Request, res: express.Response) => {
  const { title, description, postType, category, city, linkContacts } = req.body;

  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({ error: "error no cookies" });

  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({ refreshToken: refreshToken }).exec();
  const foundUser = await User.findById(foundToken?.userId);

  if (!foundUser) return res.status(403).json({ error: "error user not found" });

  if (!title || !description || !postType || !category || !city)
    return res.status(400).json({ message: `Properties are required` });

  const newPost = new Post({
    userId: foundUser._id,
    title: title,
    description: description,
    postType: postType,
    categories: [category],
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

export const updatePost = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;

  !id && res.status(400).json({ error: "no id" });

  const { title, description, postType, category, city, linkContacts } = req.body;

  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({ error: "error no cookies" });

  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({ refreshToken: refreshToken }).exec();
  const foundUser = await User.findById(foundToken?.userId);

  if (!foundUser) return res.status(403).json({ error: "error user not found" });

  if (!title || !description || !postType || !category || !city)
    return res.status(400).json({ message: `Properties are required` });

  const update = {
    ...(title ? { title: title } : {}),
    ...(description ? { description: description } : {}),
    ...(postType ? { postType: postType } : {}),
    ...(category ? { categories: [category] } : {}),
    ...(city ? { city: city } : {}),
  };

  try {
    const result = await Post.findByIdAndUpdate(id, update, { new: true });

    res.status(200).json({ message: "Post is updated" });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const deletePost = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  !id && res.status(400).json({ error: "no id" });

  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({ error: "error no cookies" });

  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({ refreshToken: refreshToken }).exec();
  const foundUser = await User.findById(foundToken?.userId);

  if (!foundUser) return res.status(403).json({ error: "error user not found" });

  try {
    const result = await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post is deleted" });
  } catch (error: any) {
    res.status(400).json({ error: error });
  }
};

export const getPosts = async (req: express.Request, res: express.Response) => {
  const { title, postType, category, city } = req.query;

  try {
    const posts = await Post.find({
      $and: [
        {
          title: { $regex: title },
        },
        {
          ...(postType ? { postType: postType } : {}),
        },
        { ...(category ? { categories: category } : {}) },
        { ...(city ? { city: city } : {}) },
      ],
    });

    if (posts.length == 0) return res.status(400).json({ message: "No content" });

    res.status(200).json({ posts: posts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getEmail = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;

  try {
    const user = await User.find({ _id: id }).exec();
    if (!user) res.status(400).json({ error: "User is not found" });

    res.status(200).json({ user: user });
  } catch (error: any) {
    res.status(400).json({ error: error });
  }
};
