const dotenv = require("dotenv");
const express = require("express")
const connectDB = require("./config/dbConfig")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello Boy" })
})


app.listen(PORT, console.log(`Server running on Port: ${PORT}`));