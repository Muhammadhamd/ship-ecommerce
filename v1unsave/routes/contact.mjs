

import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()
import nodemailer from "nodemailer"
import {client} from "../../db/mongodb.mjs"
import { Timestamp } from 'mongodb'

const db = client.db("yacht"),
    //   userCol = db.collection("users"),
      contactReqCol = db.collection('contactRequestes')

router.post("/contactReq",async(req,res)=>{
    const {email , phoneNumber ,message , subject ,name} =req.body
    console.log(email , phoneNumber ,message , subject ,name)
 try {
    await contactReqCol.insertOne({
        email:email,
        phoneNumber:phoneNumber,
        subject:subject,
        message:message,
        name:name, 
        status:"pending"
    })

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
        text: 'Client want  to contact to you check it out',
      };
    
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('An error occurred while sending the email notification.');
          return
        } else {
          console.log('Email sent:', info.response);
        }
      });

    res.send(`Thankyou ${name} for contact your request is sucessfully registerd we will response you later`)
 } catch (error) {
    // res.status(403).send(error)
    console.log(error)
 }

})
router.get("/contact-requests",async(req,res)=>{

   const contactRequestsData =  await contactReqCol.find({}).toArray()
   res.send(contactRequestsData)
})
router.get('/contact', (req,res)=>{

    res.sendFile(path.join(__dirname , 'pages/contact.html'))
})
export default router