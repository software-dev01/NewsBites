import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import startRSSFetcher from "./jobs/rssFetcher.js";
import cors from "cors";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin:"https://news-bites.vercel.app",
    credentials: true
  })
);

app.use(express.json());

app.use("/api", routes);
startRSSFetcher();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});