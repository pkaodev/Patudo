import { db } from "./firebase.js";
import { GameError } from "../ErrorClasses.js";

import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * !!!make main check function which calls all other checks, only this one should be exported
 * move is valid if:
 * it is bet/bs/cabbages
 * bet - currentPlayer
 * bs - any player (but previous player)
 * bs and cabbages invalid as first move
 * cabbages - any player (but current player)
 * !!!add code/msg to thrown errors
 */

//returns a snapshot of the current game state from the db
export const fetchGameState = async (gameCode) => {
  return await (await getDoc(doc(db, process.env.DB_GAMES, gameCode))).data();
};

//returns true if the player is in the game
export const checkPlayerInGame = (gameState, uid) => {
  const { players, losers } = gameState;
  for (let i = 0; i < players.length; i++) {
    if (players[i].uid === uid) {
      return true;
    }
  }
  for (let i = 0; i < losers.length; i++) {
    if (losers[i].uid === uid) {
      throw new GameError("Player is out");
    }
  }

  throw new GameError("Player not in game");
};

//returns true if the move number is valid
export const checkMoveNumber = (gameState, moveNumber) => {
  if (moveNumber === gameState.moveNumber + 1) {
    return true;
  }
  throw new GameError("Move number is not correct");
};

//returns true if the move type is valid for the player
export const checkMoveTypeIsValid = (gameState, uid, moveType) => {
  if (!["cabbages", "bs", "bet"].includes(moveType)) {
    throw new GameError(`Move type "${moveType}" is not valid`);
  }
  if (
    moveType === "bet" &&
    gameState.players[gameState.currentPlayer].uid !== uid
  ) {
    throw new GameError('Move type "bet" is not valid for this player');
  }
  if (
    moveType === "bs" &&
    gameState.players[
      (gameState.currentPlayer + gameState.players.length - 1) %
        gameState.players.length
    ].uid === uid
  ) {
    throw new GameError('Move type "bs" is not valid for this player');
  }
  if (
    moveType === "cabbages" &&
    (gameState.players[gameState.currentPlayer].uid === uid ||
      gameState.players[
        (gameState.currentPlayer + gameState.players.length - 1) %
          gameState.players.length
      ].uid === uid)
  ) {
    throw new GameError(
      'Move type "cabbages" is not valid for this player'
    );
  }
  if (
    (moveType === "bs" && gameState.moveNumber === 0) ||
    (moveType === "cabbages" && gameState.moveNumber === 0)
  ) {
    throw new GameError(
      'Move type "bs" or "cabbages" is not valid for first move'
    );
  }
  return true;
};

export const checkGameIsntOver = (gameState) => {
  if (gameState.isOver) {
    throw new GameError("Game is over");
  }
  return true;
};

/**
 * returns object containing all the dice in the game
 */
export const fetchAllTheDice = async (gameCode) => {
  const allTheDice = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  const querySnap = await getDocs(
    query(
      collection(db, process.env.DB_PRIVATE),
      where("gameCode", "==", gameCode)
    )
  );
  querySnap.forEach((doc) => {
    doc.data().cup.forEach((dice) => {
      allTheDice[dice]++;
    });
  });
  return allTheDice;
};
