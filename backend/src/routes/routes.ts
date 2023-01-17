import express from "express";
import createUser from "../controllers/registerController";
import loginUser from "../controllers/loginController";
import refreshToken from "../controllers/refreshTokenController";
import getAllUsers from "../controllers/userController";
import verifyToken from "../middleware/verifyToken";
import verifyRoles from "../middleware/verifyRoles";
import ROLES from "../config/roles";
import logoutUser from "../controllers/logoutController";
import { createPost, deletePost, getEmail, getPosts, updatePost } from "../controllers/postController";
import { getUserPosts, profile } from "../controllers/profileController";

const routes = require("express").Router();

routes.get("/", (req: express.Request, res: express.Response) => {
  res.send("Test endpoint");
});

routes.post("/register", createUser);
routes.post("/login", loginUser);
routes.get("/refresh", refreshToken);
routes.get("/logout", logoutUser);

routes.post("/create", createPost);
routes.put("/update/:id", updatePost);
routes.delete("/delete/:id", deletePost);

routes.get("/profile", profile);
routes.get("/search", getPosts);
routes.get("/profile/:id", getUserPosts);
routes.get("/user/:id", getEmail);

routes.get("/users", verifyRoles(ROLES.User), verifyToken, getAllUsers);
module.exports = routes;
