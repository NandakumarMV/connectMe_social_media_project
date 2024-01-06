import jwt from "jsonwebtoken";

import userRepository from "../repository/userRepository.js";

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userRepository.findUserForProtect(decoded.userId);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("invalid token");
    }
  } else {
    res.status(401);
    throw new Error("not authorized");
  }
};

const isBlocked = async (req, res, next) => {
  let token;
  token = req.cookies.userjwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userRepository.findUserForProtect(decoded.userId);
      if (!user.isBlocked) {
        next();
      } else {
        res.cookie("userjwt", "", { httpOnly: true, expires: new Date(0) });

        res.status(401);

        throw new Error("blocked by the admin");
      }
    } catch (err) {
      res.status(401);

      throw new Error("not authorized,invalid token");
    }
  } else {
    res.status(401);

    throw new Error("not authorized,no token");
  }
};

const loginBlockCheck = async (req, res, next) => {
  const email = req.body.email;

  const user = await userRepository.findByEmail({ email });

  if (!user) {
    res.status(403);

    throw new Error("please signup to login");
  }

  if (user.isBlocked === true) {
    res.status(403);

    throw new Error("User is blocked. Please contact support for assistance.");
  }

  next();
};

export { protect, isBlocked, loginBlockCheck };
