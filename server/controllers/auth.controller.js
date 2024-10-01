import signUpSchema from "../validators/signup.validator.js";
import signInSchema from "../validators/signin.validator.js";
import prisma from "../lib/prisma-client.js";
import { generateToken } from "../lib/jwt.js";

export const signUp = async (req, res) => {
  try {
    const data = req.body;

    let check = await signUpSchema.validate(data);

    const newUser = await prisma.user.create({
      data: check,
    });
    // console.log("newUser:", newUser);
    res.json({ message: "Okk", newUser, status: true });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const data = req.body;
    let check = await signInSchema.validate(data);
    console.log("Check :", check);

    let user = await prisma.user.findFirst({
      where: {
        email: check.email,
        password: check.password,
      },
    });
    if (user) {
      const token = await generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });
      if (token) res.json({ status: true, data: token });
      else res.json({ status: false, data: "erreur token" });
    } else res.json({ status: false, data: "User not found" });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
};
