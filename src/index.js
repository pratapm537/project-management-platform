import dotenv from "dotenv";
import express from "express"
import app from "./app.js";
import connectDB from "./db/index.js"

dotenv.config({ path: './.env' })

const port = process.env.PORT || 3000


connectDB()
.then(
    app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`)
})
)
.catch((err) => {
    console.log("connection error ", err)
})



