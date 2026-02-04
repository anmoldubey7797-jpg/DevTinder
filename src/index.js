import express from "express";
 const app=express();


app.use("/",(req,res,next)=>{
    console.log("First server start")
    next();
})
app.use("/",(req,res,next)=>{
    console.log("Second server start")
    // res.send("Second Running")
    next()
})

app.use("/",(req,res,next)=>{
    // 
    console.log("Third server start")
     res.send("Third Running")
    next()
   
})

app.listen(8000,()=>{
    console.log("Thik hai Server ")
})