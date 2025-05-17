const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const adminRouter = require('./routes/admin');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/',adminRouter);


console.log("hello")
const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        console.log("Mongodb connection issue")
    }
}
connectDb();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})