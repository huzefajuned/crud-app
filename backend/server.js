const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoute = require("./routes/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// CONNECTING PORT AND DB_URL
dotenv.config();
PORT = process.env.PORT;
MONGODB_URL = process.env.DB_URL;

app.use(cors());
app.use(morgan("common"));


// PARSING APPLICATION/ JSON DATA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// BASE-ROUTE FOR USER AUTH
app.use("/user", userRoute);


//CREATING EXPRESS SERVER AND CONNECTING TO MONGO_DB DATABASE
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(` Database Connected, && Server running on port ${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
