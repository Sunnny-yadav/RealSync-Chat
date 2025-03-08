import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://in.images.search.yahoo.com/search/images;_ylt=AwrKGKrFD8xnqAIA4Vm7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3BpdnM-?p=avatar+logo&fr2=piv-web&type=E211IN714G0&fr=mcafee#id=110&iurl=https%3A%2F%2Fwww.creativefabrica.com%2Fwp-content%2Fuploads%2F2018%2F11%2FAvatar-logo-by-meisuseno-1.jpg&action=click",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  const booleanVal = await bcrypt.compare(password, this.password);
  return booleanVal;
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

export const User = mongoose.model("User", UserSchema);
