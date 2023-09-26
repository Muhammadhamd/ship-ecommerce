import express from "express"
import path from "path"
import v1unsave from './v1unsave/index.mjs'
import v1save from './v1save/index.mjs'
import v1adminaccess from './v1-adminaccess/index.mjs'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import cors from 'cors'
import cookieParser from "cookie-parser"
const SECRET = process.env.Secret || 'topsecret'
const __dirname = path.resolve()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(v1unsave)
const PORT = process.env.PORT || 4000

app.use(express.static(__dirname))

app.use((req, res, next) => {

    console.log("req.cookies: ", req?.cookies?.Token);

    const userToken = req?.cookies?.Token;
    const adminToken = req?.cookies?.AdminToken;


    if (userToken) {
        jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
            if (!err) {
    
                console.log("user decodedData: ", decodedData);
    
                const nowDate = new Date().getTime() / 1000;
    
                if (decodedData.exp < nowDate) {
    
                    res.status(401);
                    res.cookie('Token', '', {
                        maxAge: 1,
                        httpOnly: true
                    });
    
                    res.status(401).send("login again")
    
    
    
                } else {
    
                    console.log("token approved");
    
                    req.decodedData = decodedData
                    next();
                }
            } else {
                      res.status(401).send("authentication failed")
    
            }
        });
    }else if (adminToken) {
        
        jwt.verify(req.cookies.AdminToken, SECRET, function (err, decodedData) {
            if (!err) {
                console.log("user decodedData: ", decodedData);
    
                const nowDate = new Date().getTime() / 1000;
    
                if (decodedData.exp < nowDate) {
                    res.cookie('AdminToken', '', {
                        maxAge: 1,
                        httpOnly: true
                    });
    
                    res.status(401).send("login again");
                } else {
                    console.log("token approved");
                    req.decodedData = decodedData;
                    next();
                }
            } else {
                res.status(401).send("authentication failed");
            }
        });
    }else{
        res.send("login first")
    }
})
app.use(v1save)
app.use((req, res, next) => {
    console.log("req.cookies: ", req?.cookies?.AdminToken);

    if (!req?.cookies?.AdminToken) {
        res.status(401).send("Unauthorized: You have to log in as admin first");
        return;
    }

    jwt.verify(req.cookies.AdminToken, SECRET, function (err, decodedData) {
        if (!err) {
            console.log("user decodedData: ", decodedData);

            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {
                res.cookie('AdminToken', '', {
                    maxAge: 1,
                    httpOnly: true
                });

                res.status(401).send("login again");
            } else {
                console.log("token approved");
                req.decodedData = decodedData;
                next();
            }
        } else {
            res.status(401).send("authentication failed");
        }
    });
});


app.use(v1adminaccess)
app.listen(PORT,console.log(`listen on ${PORT}`))