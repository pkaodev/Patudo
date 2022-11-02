import {moveBet, moveBS, moveCabbages} from './models.js';
import { fetchGameState, checkPlayerInGame, checkMoveNumber, checkMoveTypeIsValid, checkGameIsntOver } from './firebase/firebaseFunctionsAPI.js';
import {fetchAllTheDice} from './firebase/firebaseFunctionsAPI.js';

/**
 * !!!extract check functions into single function
 * !!!separate controller into multiple endpoints
 */

export const controller = async (uid, body, res, next) => {

    const { gameCode, moveNumber, moveType, betValue} = body;

    const gameState = await fetchGameState(gameCode);

    //PROMISE ALL!!!
    checkGameIsntOver(gameState);
    checkPlayerInGame(gameState, uid);
    checkMoveNumber(gameState, moveNumber);
    checkMoveTypeIsValid(gameState, uid, moveType);

    const allTheDice = await fetchAllTheDice(gameCode);
    if (moveType === 'bet') {
        return moveBet(gameState, gameCode, uid, betValue, allTheDice);

    } else if (moveType === 'bs') {
        return moveBS(gameState, gameCode, uid, allTheDice);
        
    } else if (moveType === 'cabbages') {
        return moveCabbages(gameState, gameCode, uid, allTheDice);
    }

}