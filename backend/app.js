import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import cors from "cors";
import blog_router from "./routes/blog-routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blog_router);

mongoose
  .connect(
    "mongodb+srv://rock:rock@blogapp.p4juozd.mongodb.net/BlogApp?retryWrites=true&w=majority"
  )
  .then(() => app.listen(8000))
  .then(() => console.log("Successfully connected to database 😃"))
  .catch((e) => console.log(e));
