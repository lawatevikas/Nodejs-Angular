const express=require('express')
require('./db/config')
const User=require('./db/user')
const Product=require('./db/product')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
app.post("/resister",async(req,resp)=>{
    let user= new User(req.body);
    let result=await user.save();
    // result=result.toObject();
    // delete result.password
    if(user){
        const data={
            statuscode:"200",
            data:{user},
            msg:"success"
        }     
        resp.status(200).send(data)
    }else{
        const data={
            statuscode:"Error",
            data:{user},
            msg:"Technical issue Try After some time"
        }
        resp.send(data)
    }
    
   
    
})

app.post("/login",async(req,resp)=>{
    if(req.body.password && req.body.email){
    let user= await User.findOne(req.body).select("-password")
    if(user){
        const data={
            statuscode:"200",
            data:{user},
            msg:"success"
        }     
        resp.status(200).send(data)
    }else{
        const data={
            statuscode:"Error",
            data:{user},
            msg:"No user found"
        }
        resp.send(data)
    }
    }else{
        resp.send(
            {result:"Please Enter Correct data."}) 
    }
   
   
})
app.post("/add-product",async (req,resp)=>{
    let product=new Product(req.body);
    let result= await product.save()
    resp.send(result)
})

app.get("/product-list",async(req,resp)=>{
    let products=await Product.find()
    if(products.length>0){
        const data={
            statuscode:"200",
            data:{products},
            msg:"success"
        } 
        resp.status(200).send(data)
    }else{
        const data={
            statuscode:"Error",
            data:{products},
            msg:"No record found"
        }
        resp.send(data)
    }
    
})

app.delete("/product/:id", async (req,resp)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})
app.get("/product/:id",async(req,resp)=>{
    let products=await Product.findOne()
    if(products){
        resp.send(products)
    }else{
        resp.send("No record found")
    }
})
app.put("/product/:id",async(req,resp)=>{
    const result= await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})
// app.get("/search/:key",async(req,resp)=>{
//     const result=await Product.find({
//         "$or":[
//             {name:{$regex:req.}}
//         ]
//     })
// })

app.listen('5000')