import express from 'express'
const router = express.Router()
import dashbordRoute from "./routes/dashbord.mjs"


router.use(dashbordRoute)

export default router