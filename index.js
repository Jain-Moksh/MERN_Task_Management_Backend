import express from "express";
import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import TaskRouter from "./routes/TaskRoute.js";

dotenv.config();

// port value from .env file
const PORT = process.env.PORT;

const app = express();
app.use(express.json()); //it is a middleware which parses the JSON data to be available in req.body

// cors are used to allow cross-origin api access which means that the api request will be served only if the request is made from localhost:5173 all other will be blocked
app.use(
  cors({
    origin: "https://your-frontend-on-render.com", // Replace with your actual frontend URL
    methods: "GET, POST, PUT, DELETE",
    credentials: true, // If using authentication
  })
);

app.use("/api/task", TaskRouter);

// mongoose is used for connecting mongodb atlas
// it fetches the connection string from .env
mongoose
  .connect(process.env.MongoDB_Connection)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

// thats all
