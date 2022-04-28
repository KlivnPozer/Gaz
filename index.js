const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORN || 3000

app.use(express.json())

async function start(){
    try
    {
  
    }
    catch(e)
    {
        console.log(e)
    }    
}
app.listen(PORT, ()=> {
    console.log(`SERVER STARTED ON :${PORT}`)
})