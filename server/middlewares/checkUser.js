import { verifyToken } from "../lib/jwt.js";
import prisma from "../lib/prisma-client.js";

export const checkUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    // console.log("token", token);

    if (token) {
      const verify = await verifyToken(token);
      if (verify) {
        const user = await prisma.user.findUnique({
          where: {
            email: verify.email,
          },
        });
        if (user) {
          res.locals.userId = verify.id;
          res.locals.userName = verify.name;
          next();
        } else res.status(403).send("User not found");
      } else res.status(403).send("Token not valid");
    } else res.status(403).send("Token not found");
  } catch (error) {
    console.log("error token", error.message);
    res.status(502).json({
      error: error.message,
      status: false,
    });
  }
};
