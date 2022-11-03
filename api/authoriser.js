import { getAuth } from "firebase-admin/auth";
import { controller } from "./controller.js";
import { PseudoCustomError } from "./pseudoErrors.js";

//middle ware that checks if user is authenticated
export const authoriser = async (req, res, next) => {
  try {
    if (!req.headers.patauthtoken || !req.headers.patauthuid) {
      throw new PseudoCustomError({
        status: 401,
        msg: "401 - unauthorized, missing headers",
      });
    }

    const decodedToken = await getAuth().verifyIdToken(
      req.headers.patauthtoken
    );

    if (decodedToken.uid !== req.headers.patauthuid) {
      throw new PseudoCustomError({
        status: 401,
        msg: "401 - unauthorized, incorrect uid",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
