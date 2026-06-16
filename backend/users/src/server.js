import express from "express"
import { PORT } from "./utils/env"

const app = express()

app.get("/health",(req,res)=>{res.json({status :"success", message : "Server running "})})
app.listen(PORT,()=>{console.log("Server running on PORT : "+PORT);
})