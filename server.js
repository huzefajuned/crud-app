const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5500;
const MONGODB_URL='mongodb+srv://Huzefa:Huzefa7761@cluster0.lslz2af.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Data base Connected! &&  server is on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(` Some Errors Occured on Server  ${" "}${error}`);
  });
