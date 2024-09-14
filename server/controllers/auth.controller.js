import signUpSchema from "../validators/signup.validator.js";
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
    res.send("Okk");
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
};
