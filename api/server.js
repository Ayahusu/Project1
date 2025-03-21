const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dbConnect = require("./config/dbConfig")
const authRoute = require("./routes/authRoutes")
const userRoute = require("./routes/userRoutes")
const postRoute = require("./routes/postRoutes")
dotenv.config()


const PORT = process.env.PORT;
dbConnect();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND,  // Make sure this is set correctly
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
    credentials: true
}));
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute)
app.use("/api/posts", postRoute)

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
})
