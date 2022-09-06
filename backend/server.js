const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//port and database Url
PORT = 3300;
MONGODB_URL =
  "mongodb+srv://Huzefa:Huzefa7761@cluster0.lslz2af.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(morgan());

// parse application/json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//$ BASE-ROUTE FOR USER AUTH
app.use("/user", userRoute);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(` Database Connected, && Server running on port ${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
