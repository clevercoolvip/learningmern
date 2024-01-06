const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const port = 5000;

//database connection and schema definition
const dbURI = require("./config/db");
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((val)=>{
    console.log("Succefully connected!!");
}).catch((error)=>{
    console.log("Error connecting", error);
});
const signupschema = new mongoose.Schema({
    email: String,
    password: String
});
const UserInfo = mongoose.model("userinfo", signupschema);





//server definition
app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res)=>{
    public_dom = path.join(__dirname, "views", "public.html");
    res.sendFile(public_dom);
})

// signup functionality
app.get("/signup", (req, res)=>{
    signup_dom = path.join(__dirname, "views", "signup.html");
    res.sendFile(signup_dom);
});

app.post("/signup", (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;
    console.log(`${email} | ${password}`);
    const val = new UserInfo({
        email: email,
        password : password
    });
    val.save().then(()=>console.log("Successfull Signup")).catch((error)=>console.log("Error occured!!"));
    res.redirect("/");
});
//loginned
app.get("/loginned", (req, res)=>{
    res.sendFile(`${path.join(__dirname, "views", "loginned.html")}`);
})

//login functionality
app.get("/login", (req, res)=>{
    login_dom = path.join(__dirname, "views", "login.html");
    res.sendFile(login_dom);
});

app.post("/login", (req, res)=>{
    email = req.body.email;
    try{
        const check = UserInfo.exists({email: email});
        console.log(check);
        if (check){
            if (UserInfo.exists({password: req.body.password})){
                res.redirect("/loginned");
            }
        }
    } catch{
        alert("Error info!!");
    }

});




// server starting
app.listen(port, ()=> {
    console.log(`Server started on port ${port}!`);
})
