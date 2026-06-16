import express from "express";
import { PORT } from "./utils/env.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "Server running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});