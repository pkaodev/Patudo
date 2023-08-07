//returns true/false if player has been knocked out
export const isPlayerOut = (uid, gameState) => {
  return gameState.losers.some((player) => player.uid === uid);
};

/*
 *returns object showing what moves are valid for a player, eg:
 *   {bet: true,
 *    bs: true,
 *    cabbages: false}
 */

export const findValidMoves = (gameState, uid) => {
  const { moveNumber, currentPlayer, players, currentBet } = gameState;
  const [currBetNumberOfDice, ignore] = currentBet.split(",");
  const totalDice = gameState.players.reduce((p, c) => p + c.numberOfDice, 0);

  return {
    bet:
      Number(currBetNumberOfDice) < totalDice &&
      players[currentPlayer]?.uid === uid,
    bs:
      moveNumber !== 0 &&
      (players[currentPlayer].uid === uid ||
        players[(currentPlayer + players.length - 1) % players.length].uid !==
          uid),
    cabbages:
      moveNumber !== 0 &&
      players[currentPlayer].uid !== uid &&
      players[(currentPlayer + players.length - 1) % players.length].uid !==
        uid,
  };
};

// export const findNextBet = (currentBet) => {

//     let [betNumberOfDice, betFaceValue] = betValue.split(",");

//     betNumberOfDice = Number(betNumberOfDice);
//     betFaceValue = Number(betFaceValue);

// }

// export const findPreviousBet = (currentBet) => {

// };
