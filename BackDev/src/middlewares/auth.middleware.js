import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login!!!!");
    }

    const decodedMessage = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedMessage;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).send("Invalid or Expired Token");
  }
};

export default authUser;
