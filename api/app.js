import express from 'express';
import cors from 'cors';
import admin from "firebase-admin";
import * as dotenv from 'dotenv'
import { authoriser } from './authoriser.js';


dotenv.config()
//!!!LATER Using an OAuth 2.0 refresh token

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DB_URL,
  });
  
export const app = express();
app.use(cors())
app.use(express.json());

//SHOW INCOMING REQUESTS!!!
app.use((req, res, next) => {
    // console.log(req.headers.patauthuid)
    // console.log(req.headers.patauthtoken)
    console.log('req.body', req.body)
    next()
})

app.put('/tester', authoriser)

//error endpoints
app.all('/*', (req, res) => {
    res.status(404).send({msg: 'Route not found'});
  });

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg});
    }
    res.status(500).send({msg: 'Server error'});
})


const PORT = process.env.PORT || 8001;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});

