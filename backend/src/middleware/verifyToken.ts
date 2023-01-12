import express, { NextFunction } from "express";
const jwt = require("jsonwebtoken");

const verifyToken = (req: any, res: express.Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ error: "or" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: Error, data: any) => {
    if (err) return res.status(403).json({ error: err });
    req.user = data.userData.email;
    req.roles = data.userData.roles;
    next();
  });
};

export default verifyToken;
