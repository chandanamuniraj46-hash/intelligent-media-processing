require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");
const startWorker = require("./workers/imageWorker");


const PORT = process.env.PORT || 5000;


connectDB();

startWorker();


app.listen(PORT,()=>{
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});