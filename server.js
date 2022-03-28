import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

dotenv.config();

connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json())

//api endpoints
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the API</h1> <br/>  /api/users <br/> /api/shops <br/> /api/books");
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
