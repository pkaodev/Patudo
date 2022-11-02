import { getAuth } from "firebase-admin/auth";
import { controller } from "./controller.js";

/**
 * !!! extract authorisation to middleware and separate controller into multiple endpoints
 * 1. verify token
 * 2. call controller
 * 3. return response to user (200)
 */

export const authoriser = async (req, res, next) => {
  try {
    
    if (!req.headers.patauthtoken || !req.headers.patauthuid) {
      throw new Error({
        status: 401,
        msg: "401 - unauthorized, missing headers",
      });
    }

    const decodedToken = await getAuth().verifyIdToken(
      req.headers.patauthtoken
    );

    //Call controller if token is valid
    if (decodedToken.uid !== req.headers.patauthuid) {
      throw new Error({
        status: 401,
        msg: "401 - unauthorized, incorrect uid",
      });
    }

    const response = await controller(
      req.headers.patauthuid,
      req.body,
      res,
      next
    );

    res.status(200).send(JSON.stringify(response));



  } catch (err) {
    console.log(err);
    next(err);
  }
  
};
