import {User} from '../Models/user.Modle.js'
import {AsyncHandeller} from "../utils/AsyncHandeller.js"
import jwt from "jsonwebtoken";

export const verifyJWT = AsyncHandeller(async (req, res, next) => {
  const Token = req.header("Authorization")?.replace("Bearer ", "");
  if (!Token) {
    res.status(400).json({
      message : "Token not avilable :: unauthorized user",
    });
  }

  const decodedToken = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET_KEY);


  // const user = await User.findOne({email : decodedToken.email}).select("-password");
  const user = await User.findOne({ _id: decodedToken?._id }).select("-password");

 
  if (!user) {
    res.status(400).json({
      message: "Invalid user Token",
    });
  }

  req.userData = user;
  next();
});
