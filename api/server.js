const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConfig");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const notificationRoutes = require("./routes/notificationRoute");

dotenv.config();

const PORT = process.env.PORT || 5000;  // Default PORT if not set in .env
dbConnect();

const app = express();

<<<<<<< HEAD
app.use(cors({
    origin: process.env.FRONTEND,  // Make sure this is set correctly
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
    credentials: true
}));
app.use(cookieParser())
=======
app.use(
    cors({
        origin: process.env.FRONTEND,  // Ensure FRONTEND is set correctly
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
        credentials: true,
    })
);

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.FRONTEND },
});
>>>>>>> dc509c1 (third commit)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/notifications", notificationRoutes);

// WebSocket Connection
io.on("connection", (socket) => {
    // console.log("A user connected:", socket.id);

    socket.on("sendNotification", (notification) => {
        io.emit(`notification-${notification.receiver}`, notification); // Send to specific user
    });

    socket.on("disconnect", () => {
        // console.log("User disconnected:", socket.id);
    });
});

// Use `server.listen` instead of `app.listen`
server.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});
