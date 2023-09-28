import express from 'express'
const router = express.Router()

import dashboardRoutes from './routes/dashbord.mjs'
import postRoutes from './routes/post.mjs'
import visitereqRoutes from './routes/visitereq.mjs'
import tourreqRoutes from './routes/tourreq.mjs'
import subscribersRoutes from './routes/subscribers.mjs'
import shipcaptionRoutes from './routes/OurShipCaptions.mjs'
import reviewRoutes from './routes/review.mjs'
import reviews from './routes/reviewRoute.mjs'
import blogs from './routes/userBlogRoute.mjs'

router.use(dashboardRoutes)
router.use(reviewRoutes)
router.use(shipcaptionRoutes)
router.use(subscribersRoutes)
router.use(tourreqRoutes)
router.use(visitereqRoutes)
router.use(postRoutes)
router.use(reviews)
router.use(blogs)
export default router