const mongoose = require("mongoose");
const { User, Posts } = require("./models/db");

User.findOne({name: "Vishwajeet Panda"}).then((p) => {
    Posts.find({user: p._id}).then((q) => {
        console.log(q);
    })
}).catch((error)=>{
    console.log("No record found!")
});



