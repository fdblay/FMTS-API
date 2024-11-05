import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import projectRouter from "./routes/project.js";
// import { removeExpiredTokens } from "./middlewares/auth.js";

await mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(projectRouter);
// app.use(removeExpiredTokens);
// // Run this at regualar intervals 
// setInterval(removeExpiredTokens, 10 * 60 * 1000);



app.listen(5006, () => {
    console.log('App is listening on port 5006')
})