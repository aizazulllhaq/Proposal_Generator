import { connect } from "mongoose";
import { DB_NAME, MONGO_URL } from "../constant";

const dbConnection = async () => {
  try {
    const connectionInstance = await connect(`${MONGO_URL}/${DB_NAME}`);
    console.log(
      `\n Mongo Connected : DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongo Connection Error : ", err);
    process.exit(1);
  }
};

export default dbConnection;
