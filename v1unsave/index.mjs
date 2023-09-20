import express from 'express'
const router = express.Router()
import homeRoute from "./routes/home.mjs"
import aboutRoute from "./routes/about.mjs"
import serviceRoute from "./routes/service.mjs"
import contactRoute from "./routes/contact.mjs"
import sellRoute from "./routes/sell.mjs"
import shopRoute from "./routes/shop.mjs"
import brokerRoute from "./routes/broker.mjs"
import howehelpRoute from "./routes/howwehelp.mjs"
import didyouknowRoute from "./routes/didyouknow.mjs"
import postRoute from "./routes/post.mjs"
router.use(postRoute)
router.use(homeRoute)
router.use(aboutRoute)
router.use(sellRoute)
router.use(serviceRoute)
router.use(contactRoute)
router.use (shopRoute)
router.use (brokerRoute)
router.use (howehelpRoute)
router.use (didyouknowRoute)
export default router