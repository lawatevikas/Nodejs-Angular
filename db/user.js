const mongoose=require('mongoose')

const UserShema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})
module.exports=mongoose.model("users",UserShema)