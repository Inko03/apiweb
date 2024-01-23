const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors')
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
app.use(express.json())

mongoose.connect(`${process.env.DATA_BASE_URL}`).then(console.log('Connected')).catch((err)=>console.log("Dont work propertly"+err))

const myModel = mongoose.model("Message",{
    type:String,
    message:String
})

app.use(cors({origin: 'http://localhost:3000'}))

app.get('/',async(req,res)=>{
    const result = await  myModel.find({})
    console.log("Conented someone a")
    res.json(result)
})

app.post('/add', async(req,res)=>{
    if(req.body.type&&req.body.message){
        const type = req.body.type;
        const message = req.body.message;
        const newobj = await myModel.create({type:type, message:message})
        res.json({message:"SUCCESS"})
    }else{
        res.json({message:"No valid data"})
    }
})


app.listen(port,()=>{
    console.log(`Server working on port ${port}`)
})