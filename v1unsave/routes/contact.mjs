

import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()


router.get('/contact', (req,res)=>{

    res.sendFile(path.join(__dirname , 'pages/contact.html'))
})
export default router