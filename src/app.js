import express from "express";

import cors from 'cors'

const app = express();

//basic configration
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))

//cors configration
app.use(cors({
    origin: process.env.CROS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","PUT","PATCH","OPTION","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// import the routes
import healthCheckRoute from './routes/healthcheck.routes.js'

app.use("/api/v1/healthcheck", healthCheckRoute)

app.get('/',(req,res) => {
    res.send("<h1>Welcome to -Home</h1>")
})

app.get('/login',(req,res) => {
    res.send("<h1>you are logged now</h1>")
})

app.get('/course',(req,res) => {
    res.send("<h1>Welcome to -Course</h1>")
})


export default app;