const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


//db connection
const dburl = "mongodb://0.0.0.0:27017/Learning_and_testing";
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log("Connected")).catch((error)=> console.log("Connection error: ", error));

// DB schema
const Schema = mongoose.Schema;
const signupdataschema = new Schema({
    email: String,
    password: String
})
const SignUpData = mongoose.model('Signupdata', signupdataschema);

const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//SIGNUP
app.get("/", (req, res)=>{
    index_path = path.join(__dirname, "views", "index.html");
    console.log(index_path);
    res.sendFile(index_path);
});

app.get("/done", (req, res)=>{
    res.send("Record Added");
});

app.post("/", (req, res)=>{
    var email = req.body.email;
    var pwd = req.body.pwd;
    const val = new SignUpData({
        email: email,
        password: pwd
    });
    val.save().then((post)=> console.log("Added: ", post)).catch((error)=> console.log("Error adding: ", error));
    console.log(`${email} | ${pwd}`);
    res.redirect("/done");
});


//SIGNIN
app.get("/signin", (req, res)=>{
    idx_path = path.join(__dirname, "views", "signin.html");
    res.sendFile(idx_path);
});

app.post("/signin", async (req, res)=>{
    var email = req.body.email;
    var pwd = req.body.pwd;
    
    console.log(`${email} | ${pwd}`);

    try{
        const val = await SignUpData.find();
        res.json(val);
    }
    catch (error){
        res.json({Error: error});
    }

});


//APP LISTENER
app.listen(port, ()=>{
    console.log(`Server listening on ${port}`);
});
