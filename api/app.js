import express from 'express';
import cors from 'cors';
import admin from "firebase-admin";
import * as dotenv from 'dotenv'
import { authoriser } from './authoriser.js';
import { controller } from "./controller.js";


dotenv.config()

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

/**
 * end-point for for everything:
 * creating lobby (not yet implemented)
 * joining lobby (not yet implemented)
 * leaving lobby (not yet implemented)
 * starting game (not yet implemented)
 * sending game moves
 * 
 * !!! extract authorisation to middleware and separate rest into multiple endpoints
 */ 


app.use(authoriser)

//!!!rename to /gameMove
app.put('/tester', controller)



//ERRORS
app.all('/*', (req, res) => {
    res.status(404).send({msg: 'Route not found'});
  });

app.use((err, req, res, next) => {
  // console.log('ERROR', err.msg)
    /**
     * custom error handling should be of shape:
     * {
     * status: <STATUS_CODE>,
     * message: <ERROR_MESSAGE>
     * }
     */
    if (err.statusCode && err.message) {
      console.log('CUSTOM ERROR', err)
        res.status(err.statusCode).send({message: err.message});
    } else {
    console.log('500 ERROR')
    res.status(500).send({message: 'Server error'});
    }
})


const PORT = process.env.PORT || 8001;

app.listen(PORT, (err) => {
  if (err) throw err;
});

