const express = require("express");
const cors = require("cors");

const imageRoutes = require("./routes/imageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/images", imageRoutes);


app.get("/", (req,res)=>{
    res.json({
        success:true,
        message:"Intelligent Media Processing API is running."
    });
});


module.exports = app;