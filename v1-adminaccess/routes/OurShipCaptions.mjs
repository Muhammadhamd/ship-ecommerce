
import express from 'express';
import { client } from '../../db/mongodb.mjs'
import { ObjectId } from 'mongodb'

const db = client.db("yacht");
const col = db.collection("shipcaption");

let router = express.Router()



// POST    /api/v1/post
router.post('/add-ship-caption', async (req, res, next) => {


    const {image , name , email , Instagramlink , twitterink , fascebooklink , linkedinlink , phonenumber} = req.body
    try {

        const socialMediaLinks = {
            Instagram:Instagramlink,
            fascebook:fascebooklink,
            linkedin:linkedinlink,
            twitter:twitterink,
        }
        const insertResponse = await col.insertOne({
            // _id: "7864972364724b4h2b4jhgh42",
            image:imageurl,
            Name: name,
            phonenumber: phonenumber,
            email: email,
            socialMediaLinks
        });
        console.log("insertResponse: ", insertResponse);

        res.send('post created');
    } catch (e) {
        console.log("error inserting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})


router.get('/ship-captions', async (req, res, next) => {

    const cursor = col.find({})
        .sort({ _id: -1 })
        .limit(4);

    try {
        let results = await cursor.toArray()
        console.log("results: ", results);
        res.send(results);
    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})


// [92133,92254, 92255 ]


// PUT     /api/v1/post/:postId
// {
//     title: "updated title",
//     text: "updated text"
// }

router.put('/ship-caption/:postId', async (req, res, next) => {

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
router.delete('/ship=caption/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    try {
        const deleteResponse = await col.deleteOne({ _id: new ObjectId(req.params.postId) });
        console.log("deleteResponse: ", deleteResponse);
        res.send('post deleted');
    } catch (e) {
        console.log("error deleting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})

export default router