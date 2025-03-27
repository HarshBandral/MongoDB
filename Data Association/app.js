const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/',function(req,res){
    res.send('hey');
})

app.get('/create',async function(req,res){
    let user = await userModel.create({
        username : "harsh",
        age : 21,
        email : "harsh@gmail.com"
    })
    res.send(user);
})

app.get('/post/create',async function(req,res){
    let post = await postModel.create({
        postdata : "hello , how are you",
        user : "67e4f519193de1024f35e6b6",
        // date is default
    })
    let user = await userModel.findOne({_id:"67e4f519193de1024f35e6b6"});
    user.posts.push(post._id);
    await user.save();// khud ke changes ko save krna hota hai

    res.send({user,post});
})

app.listen(3000,()=>{
    console.log("running")
});