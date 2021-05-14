var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv").config();
var mongoose = require("mongoose");

app = express();



const uri = process.env.DB_CONNECT;
const port = process.env.PORT||9000;

app.use(cors());
app.use(express.json());

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true});//connecting database;

const connection= mongoose.connection;

connection.once('open', ()=>{
    console.log("MongoDb database connection established successfully");
});//event listening for an opened connection

const userRoute = require("./routes/users");
const softwareRoute = require("./routes/software");

// app.use('/app',softwareRoute);
app.use('/u',userRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});