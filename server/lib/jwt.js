import jwt from "jsonwebtoken";

export const generateToken = async (data) => {
  try {
    const token = await jwt.sign(data, "nan2025", {
      expiresIn: 60 * 15,
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyToken = async (token) => {
  try {
    const verify = await jwt.verify(token, "nan2025");
    console.log(verify);

    if (verify) return verify;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
