import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()


router.get('/sell-boat', (req,res)=>{

    res.sendFile(path.join(__dirname , 'pages/sellpage.html'))
})
export default router