const express = require('express');
const app =  express();

const userModel = require('./models/user');

app.get('/',function(req,res){
    res.send('hey');
})

app.get('/create',async function(req,res){
    let userdata = await userModel.create({
        username : 'ichigo',
        nickname : 'ichi',
        description : 'substitute soul reaper',
        categories : ['js','ejs'],  
    });
    res.send(userdata);
})

app.get('/find',async function(req,res){

//? case insensitive search
    var regex = new RegExp('^ichigo$','i')
        // RegExp -  sequence of characters used for pattern matching and text manipulation
        // ^  should start with 
        // $  should end with
        // i  case insensitive
    let user = await userModel.find({username:regex});
    res.send(user);
})

app.get('/find1',async function(req,res){

    //? find documents where an array field contains all of a set of values
        let user = await userModel.find({categories : {$all : ['ejs','js']}});
        // from categories so we have to put it in array and $ all -> all users 
        res.send(user);
    })
    

app.get('/find2',async function(req,res){
    //? find documents by date range 
        var date1 = new Date('2025-04-1');
        var date2 = new Date('2025-04-3');

        let user = await userModel.find({datecreated : {$gte : date1 , $lte : date2}}) ;
            // $gte -> greater than equal to 
            // $lte -> less than equal to 
        res.send(user);
})


app.get('/find3',async function(req,res){
    //? based on existence of a field in mongoose
        let user = await userModel.find({categories : {$exists:true}}) ;
            // categories field exist
    res.send(user);
})

app.get('/find4',async function(req,res){
    //? documents based on specific field's length 
        let user = await userModel.find({
            $expr: {
                $and: [
                    {$gte : [{$strLenCP : '$nickname'},4]},
                    {$lte : [{$strLenCP : '$nickname'},5]}
                ]
            }
        }) ;
            // $expr : Allows usage of aggregation expressions in a regular query like : $strLenCP, $gte, $lte, $and

            // $and : Ensures that both conditions must be true

            // $strLenCP : Calculates the character length of a string field
    res.send(user);
})

app.listen(3000,function(){
    console.log('running');
})