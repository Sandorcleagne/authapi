import express from "express";
import dbConnection from "./db/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/userRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DataBaseUri = process.env.DataBaseUri;
app.use(cors());
app.use(express.json());
dbConnection(DataBaseUri);
app.use("/authapi", authRouter);
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}/`);
});
