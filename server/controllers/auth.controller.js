import signUpSchema from "../validators/signup.validator.js";
import signInSchema from "../validators/signin.validator.js";
import prisma from "../lib/prisma-client.js";

export const signUp = async (req, res) => {
  try {
    const data = req.body;

    let check = await signUpSchema.validate(data);

    const newUser = await prisma.user.create({
      data: check,
    });
    console.log(check);

    // console.log("newUser:", newUser);
    res.json({ message: "Okk", newUser });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const data = req.body;
    let check = await signInSchema.validate(data);
    let user = await prisma.user.findFirst();
  } catch (error) {
    
  }
};
