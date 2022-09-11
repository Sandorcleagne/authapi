import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConnection = async (DataBaseUri) => {
  try {
    const dbOptions = {
      dbName: "authapidatabase",
    };
    await mongoose.connect(DataBaseUri, dbOptions);
    console.log("Connection Successful");
  } catch (error) {
    console.log("Connection Unsucessfull", error);
  }
};

export default dbConnection;
