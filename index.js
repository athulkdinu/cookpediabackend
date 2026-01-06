require("dotenv").config();

const express = require("express")

const cors = require("cors")
require("./connection")
const routes = require("./routes")

const cookpediaserver =express()

cookpediaserver.use(cors())

cookpediaserver.use(express.json())
cookpediaserver.use(routes)

const PORT =3000

cookpediaserver.listen(PORT,()=>{
    console.log(`cookpedia server start at port number${PORT} `);
    
})

cookpediaserver.get("/",(req,res)=>{
    res.status(200).json(`cookpedia serer started and waiting for client request`)
})