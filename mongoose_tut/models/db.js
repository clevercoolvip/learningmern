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
