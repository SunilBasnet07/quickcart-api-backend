import express from "express";
import dotenv from "dotenv";
import productsRoute from "./routes/productsRoute.js"
import usersRoute from "./routes/usersRoute.js"
import authRoute from "./routes/authRoute.js"
import bodyParser from "body-parser"
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import multer from "multer";
import connectCloudinary from "./config/cloudinary.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors"

dotenv.config();
const app = express();
connectDB();
connectCloudinary();
const upload = multer({ storage: multer.memoryStorage(), })
app.use(cors())

app.use(logger);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



const PORT = process.env.PORT;

app.get("/",(req,res)=>{
  res.json({
    "name": "nodejs-20250120",
    "version": "1.0.0",
    "port":PORT,
    "author":"Sunil Basnet"
  })
})

app.use("/api/products",upload.array("images",5),productsRoute);
app.use("/api/users",upload.single("image"),usersRoute)
app.use("/api/auth",authRoute)
app.use("/api/orders",orderRoute)


app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});