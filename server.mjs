import express from "express"
import path from "path"
import v1unsave from './v1unsave/index.mjs'
import v1save from './v1save/index.mjs'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import cors from 'cors'
import cookieParser from "cookie-parser"
const __dirname = path.resolve()
const app = express()

app.use(v1unsave)
const PORT = process.env.PORT || 4000

app.use(express.static(__dirname))

app.use((req, res, next) => {

    console.log("req.cookies: ", req?.cookies?.token);

    if (!req?.cookies?.token) {
       res.sendFile(path.join(__dirname , "pages/login.html"))
        return;
    }

    jwt.verify(req.cookies.token, SECRET, function (err, decodedData) {
        if (!err) {

            console.log("decodedData: ", decodedData);

            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {

                res.status(401);
                res.cookie('Token', '', {
                    maxAge: 1,
                    httpOnly: true
                });
                res.sendFile(path.join(__dirname , "pages/login.html"))


            } else {

                console.log("token approved");

                req.body.token = decodedData
                next();
            }
        } else {
                   res.sendFile(path.join(__dirname , "pages/login.html"))

        }
    });
})
app.use(v1save)


app.listen(PORT,console.log(`listen on ${PORT}`))