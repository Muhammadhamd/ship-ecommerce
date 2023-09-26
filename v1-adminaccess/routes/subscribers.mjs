
import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import nodemailer from 'nodemailer';
// import  transporter  from "./emailconfog.mjs"
import { ObjectId } from "mongodb"
import bodyParser from "body-parser"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"

const db = client.db("yacht"),
      subscribeCol = db.collection('subscribed');


   



router.get("/countsubscribers", async(req,res ,next)=>{

    const subscribers = await subscribeCol.countDocuments()
    res.json({ count: subscribers });
     
})
   router.get("/subscribers",async(req,res)=>{

    const sub = await subscribeCol.find({}).toArray()
    res.send(sub) 
  })

  export default router