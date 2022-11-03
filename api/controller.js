import {moveBet, moveBS, moveCabbages} from './models.js';
import { fetchGameState, checkPlayerInGame, checkMoveNumber, checkMoveTypeIsValid, checkGameIsntOver } from './firebase/firebaseFunctionsAPI.js';
import {fetchAllTheDice} from './firebase/firebaseFunctionsAPI.js';

/**
 * !!!extract check functions into single function
 * !!!separate controller into multiple endpoints
 */

// export const controller = async (uid, body, res, next) => {
export const controller = async (req, res, next) => {

    try {

    const uid = req.headers.patauthuid;
    const body = req.body;

    console.log('controller called')
    console.log('uid', uid)
    console.log('body', body)

    const { gameCode, moveNumber, moveType, betValue} = body;

    const gameState = await fetchGameState(gameCode);

    //combine!!!
    checkGameIsntOver(gameState);
    checkPlayerInGame(gameState, uid);
    checkMoveNumber(gameState, moveNumber);
    checkMoveTypeIsValid(gameState, uid, moveType);



    //old
    // res.status(200).send(JSON.stringify(response));
    // need to add a response to client, currently none
    const allTheDice = await fetchAllTheDice(gameCode);
    if (moveType === 'bet') {
        return moveBet(gameState, gameCode, uid, betValue, allTheDice);

    } else if (moveType === 'bs') {
        return moveBS(gameState, gameCode, uid, allTheDice);
        
    } else if (moveType === 'cabbages') {
        return moveCabbages(gameState, gameCode, uid, allTheDice);
    }

} catch (err) {
    next(err)
  }

}