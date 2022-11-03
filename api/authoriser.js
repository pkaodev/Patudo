import { getAuth } from "firebase-admin/auth";
import { controller } from "./controller.js";
import { CustomError } from "./ErrorClasses.js";

//middle ware that checks if user is authenticated
export const authoriser = async (req, res, next) => {
  try {
    if (!req.headers.patauthtoken || !req.headers.patauthuid) {
      throw new CustomError("401 - unauthorized, missing headers", 401);
    }

    const decodedToken = await getAuth().verifyIdToken(
      req.headers.patauthtoken
    );

    if (decodedToken.uid !== req.headers.patauthuid) {
      throw new CustomError("401 - unauthorized, mismatched uid", 401);
    }

    next();
  } catch (err) {
    next(err);
  }
};
