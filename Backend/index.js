import dotenv from "dotenv";
import dbConnection from "./src/DB/dbConnection";
import app from "./src/app";
import { PORT, SERVER_URL } from "./src/constant";

dotenv.config({
  path: "./env",
});

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${SERVER_URL}/${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Connection Failed : ", err);
    process.exit(1);
  });
