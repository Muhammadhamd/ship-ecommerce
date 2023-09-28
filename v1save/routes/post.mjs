import express from "express";
import path from "path";
import { Storage } from "@google-cloud/storage";
import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

const __dirname = path.resolve();
const router = express.Router();
import { client } from "../../db/mongodb.mjs";

const db = client.db("yacht"),
  userCol = db.collection("users"),
  postsCol = db.collection("getAvalution"),
  productsCol = db.collection("product");

// Initialize Firebase Admin SDK with your service account key
const firebaseConfig = {
  apiKey: "AIzaSyDcwQsQZBVGCl1oYr9jvUZSXmR0_A6C-SI",
  authDomain: "buying-selling-hh.firebaseapp.com",
  projectId: "buying-selling-hh",
  storageBucket: "buying-selling-hh.appspot.com",
  messagingSenderId: "293548727797",
  appId: "1:293548727797:web:ffce5ab28bff14fb2754bc"
};

// Initialize Firebase
   admin.initializeApp(firebaseConfig);

const bucket = admin.storage().bucket();

router.post("/getAValution",  async (req, res) => {
  const currentUser = req.decodedData;

  const {
    firstName,
    LastName,
    engine,
    hours,
    boatName,
    generator,
    boatcondition,
    location,
    owneroutright,
    amountOfOwner,
    route,
    attatchment, // Note: Change this to "attachments"
    addNote,
    address,
    make,
    model,
    email,
    phoneNumber,
  } = req.body;

   console.log("data ",req.body)
  // Generate a unique filename for each attachment
  // const attachmentFiles = [];
  // for (const file of attatchment) {
  //   const uniqueFilename = `${currentUser._id}_${Date.now()}_${uuidv4()}`;
  //   const fileUpload = bucket.file(uniqueFilename);

  //   const blobStream = fileUpload.createWriteStream({
  //     metadata: {
  //       contentType: file.mimetype,
  //     },
  //   });

  //   blobStream.on("error", (error) => {
  //     console.error("Error uploading attachment:", error);
  //   });

  //   blobStream.on("finish", () => {
  //     // The file has been uploaded successfully
  //     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
  //     attachmentFiles.push(publicUrl);

  //     if (attachmentFiles.length === attatchment.length) {
  //       // All attachments have been uploaded, proceed to save the post
  //       postsCol.insertOne({
  //         userAccoundId: currentUser._id,
  //         useremail: currentUser.email,
  //         userphoneNumber: currentUser.phoneNumber,
  //         username: currentUser.name,
  //         timestamp: new Date(),
  //         status: "pending",
  //         firstName,
  //         LastName,
  //         engine,
  //         hours,
  //         boatName,
  //         generator,
  //         boatcondition,
  //         location,
  //         owneroutright,
  //         amountOfOwner,
  //         route,
  //         attatchment: attachmentFiles, // Use the URLs of uploaded attachments
  //         addNote,
  //         address,
  //         make,
  //         model,
  //         email,
  //         phoneNumber,
  //       });

  //       // Send response after saving the post
  //       res.send("Post is created and saved in the database");
  //     }
  //   });

  //   blobStream.end(file.buffer); // Start uploading the file
  // }
});

router.get("/productsCurrentUser", async (req, res) => {
  const currentUser = req.decodedData;

  const data = await postsCol.findMany({ userAccoundId: currentUser._id}).toArray(); // Correct the missing `toArray` call
  res.send(data);
});

export default router;
