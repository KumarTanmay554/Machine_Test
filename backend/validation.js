const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().email({ message: "A valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const addAgentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "A valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  mobile: z.string().min(1, { message: "Mobile number is required" }),
});

module.exports = { loginSchema, addAgentSchema };