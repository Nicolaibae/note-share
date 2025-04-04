import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes"
import noteRouter from "./routes/note.routes"
import connectDB from "./config/db";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/note",noteRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
