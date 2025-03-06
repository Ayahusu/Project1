const dotenv = require("dotenv");
const express = require("express")
const connectDB = require("./config/dbConfig")
const cors = require("cors")
const login = require("./routes/login")
const signup = require("./routes/signup")

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use(cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use("/api/login", login);
app.use("api/signup", signup);


app.listen(PORT, console.log(`Server running on Port: ${PORT}`));