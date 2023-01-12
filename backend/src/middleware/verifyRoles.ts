import express, { NextFunction } from "express";

const verifyRoles = (...roles: any) => {
  return (req: any, res: express.Response, next: NextFunction) => {
    if (!req?.roles) return res.status(401).json({ error: "Error. No roles" });

    const rolesArr = [...roles];

    const result = req.roles.map((role: any) => rolesArr.includes(role)).find((val: any) => val === true);

    if (!result) return res.status(401).json({ error: "error" });

    next();
  };
};

export default verifyRoles;
