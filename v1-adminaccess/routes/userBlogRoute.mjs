import express from 'express'
import { ObjectId } from 'mongodb'
import { client } from '../../db/mongodb.mjs'

const router = express.Router()

const db = client.db("yacht")
const userBlog = db.collection("userBlog")



router.post('/create-blog', async (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    console.log(title)
    console.log(description)
    try {
        await userBlog.insertOne({
            title: title,
            description: description
        })
    } catch (error) {
        console.log(error)
        return res.json({"message": "error occured"})
    }
    return res.status(200).json({"message": "review inserted"})
})

router.get('/get-blogs', async (req, res) => {
    try {
        const revs = await userBlog.find({}).toArray()
        console.log(revs);
        return res.send(revs)
    } catch (error) {
        return res.json({"error": "error occurred"})
    }
})

router.delete('/delete-blog/:id', async (req, res) => {
    try {
        const reqId = req.params;
        const deleteReq = await userBlog.findOneAndDelete({
            _id: new ObjectId(reqId),
        })
        if (!deleteReq) {
            return res.status(404).send("no item with id to delete")
        }
        return res.status(200).json({"message": "deleted successfully"})
    } catch (error) {
        return res.json({"error": "error occurred in deleting"})
    }
})
export default router