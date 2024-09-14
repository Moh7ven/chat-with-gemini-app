import y from "yup";

let signUpSchema = y.object({
  name: y.string().required(),
  email: y.string().email().required(),
  phoneNumber: y.string().required(),
  password: y.string().required().min(8).max(16),
});

export default signUpSchema;
