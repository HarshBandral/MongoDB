const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get('/',(req,res)=>{
    res.send("hey");
})

// create
app.get('/create',async(req,res)=>{
    let createdUser = await userModel.create({
        name:"ami",
        email : "ami@gmail.com",
        username : "fatuu"
    })
    res.send(createdUser);
})

// update
app.get('/update',async(req,res)=>{
    let updatedUser = await userModel.findOneAndUpdate({name:"harsh"},{username:"mugi"},{new:true});
    res.send(updatedUser);
})

// read
app.get('/read',async(req,res)=>{
    let users = await userModel.find(); //read all
    // let users = await userModel.findOne({username:"fatuu"});
    res.send(users);
})


// delete
app.get("/delete",async(req,res)=>{
    let users = await userModel.findOneAndDelete({username:"mugi"})
    res.send(users);
})

app.listen(3000,()=>{
    console.log("running");
});