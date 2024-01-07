const mongoose = require("mongoose");
const dburi = "mongodb://0.0.0.0:27017/Learning_and_testing";

//mongoose connection
mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Connected");
}).catch((e)=>{
    console.log("Error", e);
});

//userSchema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required:true}
});

//postSchema
const postSchema = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, reference : "blogUser"}
})

//database models
const User = mongoose.model("blogUser", userSchema);
const Posts = mongoose.model("blogPosts", postSchema);


module.exports = {
    User, 
    Posts
};


// const newUser = new User({
//     name: "Shweta Panda",
//     email: "heymisspanda27b@gmail.com"
// });
// newUser.save().then((newUser)=>console.log("Added USER Record")).catch((error)=>console.log("Error", e));

// const newPost = new Posts({
//     title: "How to be a Cabin Crew?",
//     content: "Cabin crew consisting of flight attendants carry out the instructions given by pilots or co-pilots outside the cockpit. They are also in charge of the safety and comfort of passengers on a flight, and they inform the passengers when necessary.",
//     user : newUser.id
// });

// newPost.save().then((post)=>console.log("Added POSTS Record")).catch((error)=>console.log("Error", e));
