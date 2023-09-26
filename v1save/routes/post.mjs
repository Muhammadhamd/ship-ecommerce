import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"
import nodemailer from "nodemailer"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"

const db = client.db("yacht"),
      userCol = db.collection("users"),
      postsCol = db.collection('getAvalution'),
      productsCol = db.collection('product')


      
router.post("/getAValution", async(req,res)=>{

   const currentUser = req.decodedData




    // const userData =await userCol.findOne({email:currentUserEmail})
   const {firstName , LastName ,engine , hours , boatName,generator,boatcondition, location,owneroutright,amountOfOwner , route,attatchment,addNote, address  , make,model,email ,phoneNumber }= req.body

   console.log(firstName , LastName ,engine , hours , boatName,generator,boatcondition, location,owneroutright,amountOfOwner , route,attatchment,addNote, address   , make,model,email ,phoneNumber )

await postsCol.insertOne({
   userAccoundId:currentUser._id,
   useremail:currentUser.email,
   userphoneNumber:currentUser.phoneNumber,
   username:currentUser.name,
   timestamp:new Date(),
   status:"pending",
   firstName , LastName ,engine , hours , boatName,generator,boatcondition, location,owneroutright,amountOfOwner , route,attatchment,addNote, address  , make,model,email ,phoneNumber 
})
   res.send("post is created and saved in databasa")
   
   const transporter = await nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'rachel.spencer50@ethereal.email',
          pass: '8kNebyYMJ38J2BJVtT'
      }
  });

  const mailOptions = {
      from: 'muhammadhamd.dev@gmail.com',
      to: 'gumnamfacts65@gmail.com', // Replace with the admin's email address
      subject: 'New User Post',
      text:`client posted check out your dashboard`,
    };
  
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:');
        res.status(500).send('An error occurred while sending the email notification.');
        return
      } else {
        console.log('Email sent:', info.response);
       
      }
    });
})

router.get("/productsCurrentUser",async(req,res)=>{

  const data =await productsCol.find
res.send(data)
})

export default router

