import { User } from "../Models/user.Modle.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { upload_On_Cloudinary } from "../utils/Cloudinary.js";
import {ApiResponse} from '../utils/ApiResponse.js'

const register_user = AsyncHandeller(async (req, res, next) => {
    console.log(req.body)
  const { name, email, password } = req.body;
  const avatarPath = req.file?.path;

  if (!name || !email || !password || !avatarPath) {
    return next({
      message: "All Fileds are Requried",
    });
  }

  const userAllreadyExit = await User.findOne({
    $or: [{name}, {email}],
  });

  if (userAllreadyExit) {
    let message;
    if (userAllreadyExit.name === name) {
      return next({ message: "Name already exist" });
    } else {
      return next({ message: "email already exist" });
    }
  }

  const avatar = await upload_On_Cloudinary(avatarPath);

  if (!avatar) {
    return next({
      message: "Error occured while uploading the image",
    });
  }

  const RegistrationData = await User.create({
    name,
    email,
    password,
    avatar,
  });

  if (!RegistrationData) {
    return next({
      message: "User Registration failed",
    });
  }

  const Token = RegistrationData.generateAccessToken()

  if(!Token){
    return next({
       error:"Token generation failed while registration"
    })
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, {AccessToken:Token , user:RegistrationData}, "User Registration Successfull")
    );
});

const loginUser = AsyncHandeller(async( req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next({
            message: "All fields are Required"
        })
    }

    const userFound = await User.findOne({email})

    if(!userFound){
        return next({
            message:"user not found"
        })
    }

    const ispasswordValid = await userFound.isPasswordCorrect(password)

    if(!ispasswordValid){
        return next({message:"password mismatch occur"})
    }

    const Token  = await userFound.generateAccessToken()

    if(!Token){
        return next({
            Error:"Token generation failed in login operation"
        })
    }

    return res.status(200).json(new ApiResponse(200,{AccessToken:Token},"Login successfull"))


});

export { register_user ,loginUser};
