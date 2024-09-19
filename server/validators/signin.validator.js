import y from "yup";

let signInSchema = y.object({
  email: y.string().email().required(),
  password: y.string().required().min(8).max(16),
});

export default signInSchema;
