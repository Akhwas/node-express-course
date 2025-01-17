const express = require('express')
const app = express()
let {people} = require('./data')

// static assets

app.use(express.static("./methods-public"))

// parse form data
app.use(express.urlencoded({extended:false}))
// parse json
app.use(express.json())

app.get('/api/people',(req,res)=>{
    res.status(200).json({success: true, data: people})
})

app.post('/login',(req,res) =>{
    const {name} = req.body 
    if (name){
        return res.status(200).send( `welcome ${name}`)
    }
    res.status(401).json({success:false, msg:'please provide credentials'})
})

app.put('api/people/:id',(req,res) => {
    const {id} = req.params
    const {name} = req.body 
    console.log(id,name)
    res.send('hello world')
})
app.post('/api/people',(req,res) =>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please input a name'})
    }

    res.status(201).json({success:true,person: name})
})
app.post('/api/postman/people',(req,res) =>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please input a name'})
    }

    res.status(201).json({success:true,data: [...people,name]})
})

app.listen(5000,()=>{
    console.log("server is listening to port 5000...")
})
