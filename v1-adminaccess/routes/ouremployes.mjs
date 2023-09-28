
import express from 'express';
import { client } from '../../db/mongodb.mjs'
import { ObjectId } from 'mongodb'

const db = client.db("yacht");
const col = db.collection("employe");

let router = express.Router()



// POST    /api/v1/post
router.post('/add-employ', async (req, res, next) => {


    console.log(req.body)
    const {image , name , email ,phonenumber} = req.body
    try {

       
        const insertResponse = await col.insertOne({
            // _id: "7864972364724b4h2b4jhgh42",
            image:image,
            Name: name,
            phonenumber: phonenumber,
            email: email,
        });
        console.log("insertResponse: ", insertResponse);

        res.send('emply  created');
    } catch (e) {
        console.log("error inserting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})




// [92133,92254, 92255 ]


// PUT     /api/v1/post/:postId
// {
//     title: "updated title",
//     text: "updated text"
// }

router.put('/emply/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    if (!req.body.text
        && !req.body.title) {
        res.status(403).send(`required parameter missing, atleast one key is required.
        example put body: 
        PUT     /api/v1/post/:postId
        {
            title: "updated title",
            text: "updated text"
        }
        `)
    }

    let dataToBeUpdated = {};

    if (req.body.title) { dataToBeUpdated.title = req.body.title }
    if (req.body.text) { dataToBeUpdated.text = req.body.text }


    try {
        const updateResponse = await col.updateOne(
            {
                _id: new ObjectId(req.params.postId)
            },
            {
                $set: dataToBeUpdated
            });
        console.log("updateResponse: ", updateResponse);

        res.send('post updated');
    } catch (e) {
        console.log("error inserting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})

// DELETE  /api/v1/post/:userId/:postId
router.delete('/emply/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    try {
        const deleteResponse = await col.findOneAndDelete({ _id: new ObjectId(req.params.postId) });
        
        deleteResponse ? res.send('post deleted') : res.status(404).send('no post found')
        console.log("deleteResponse: ", deleteResponse);
    } catch (e) {
        console.log("error deleting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})

export default router