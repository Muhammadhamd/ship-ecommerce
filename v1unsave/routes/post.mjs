import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"

const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"

const db = client.db("userdatabase"),
      userCol = db.collection("users"),
      postsCol = db.collection('posts')


   




// const postSchema = new mongoose.Schema({

//     username:{
//         type:String,
//     },
//     sellername:{
//         type:String,
//     },
//     userId:{
//         type:String,

//     },
//     timeStamp:{
//         type: Date,
//         default: Date.now
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     title:{
//         type:String,
//         required:true
//     },
//     tag:{
//         type:String,
//         required:true
//     },
    
//     price:{
//         type:Number,
//         required:true
//     } ,
//     salesDiscount:{
//         type:Number,
        
//     } ,
//     // image:{
//     //     type:String,
//     //     required:true
//     // } ,
        
// })

// const postModel = mongoose.model("Post", postSchema)


  
       
    

// router.post("/post", async(req,res)=>{

//     // const currentUserEmail = res.locals.decodedData


//     // const userData =await userCol.findOne({email:currentUserEmail})
//    const {title , description  , price , tag ,salesDecsount }= req.body

//    console.log(title , description  , price , tag , salesDecsount ,image)
// //    const post = await postModel.create({
// //     // username: userData.username,
// //     // userId: userData._id,
// //     // sellername:userData.name,
// //     price: price,
// //     tag: tag,
// //     timeStamp: new Date(),
// //     title: title,
// //     description: description,
// //     salesDiscount:salesDecsount
// // });
//    res.send("created")
// })

router.get("/posts", async(req,res ,next)=>{
    const searched = req.query.q;
    

    const postsData =  [
      {
        title:"hamd",
        text:"this is hamd",
      },


      {
        title:"ali",
        text:"this is hamd",
      },
      {
        title:"ramal",
        text:"this is hamd",
      },
      {
        title:"hamd",
        text:"this is hamd",
      },
    ]

     

 
    const posts =  postsData

    if(searched){
        const filteredPosts = posts.filter((post) => {
            // Check if 'post' is defined and has a 'title' property before calling 'toLowerCase'
            return post && post.title && post.title.toLowerCase().includes(searched.toLowerCase());
          });
          if(filteredPosts.length > 0){
            res.send(filteredPosts);
            return
        }
            res.status(404).send(`No post found with search=${searched}`)
            return
        
        
    }
    res.send(posts)
})
router.get("/post/:postId",async (req,res)=>{
    const postId = req.params.postId
    console.log(postId)
    const post = await postsCol.findOne({ _id: new ObjectId(postId)})

    if (!post) {
        res.send("this post maybe deleted or disent exist")
        return;
    }
    res.send(post)


    
      
})
// router.get("/shop", async (req, res, next) => {
//     try {
//       const searched = req.query.q;
//       // const posts = await postsCol.find({}).toArray();
      
  
//       const filteredPosts = posts.filter((post) => {
//         // Check if 'post' is defined and has a 'title' property before calling 'toLowerCase'
//         return post && post.title && post.title.toLowerCase().includes(searched.toLowerCase());
//       });
//       if(filteredPosts.length > 0){
//         res.send(filteredPosts);
//         return
//     }else{
//         res.status(404).send(`No post found with search=${searched}`)
//         return
//     }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  
router.get("postdata/:postId",async(req ,res)=>{

    const postId = req.params.postId

    const postdata = await postsCol.findOne({ _id: new ObjectId(postId)})
    res.send(postdata)
})

export default router