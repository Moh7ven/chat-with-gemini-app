import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = async (data) => {
  try {
    const token = await jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyToken = async (token) => {
  try {
    const verify = await jwt.verify(token, process.env.JWT_SECRET);

    if (verify) return verify;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
