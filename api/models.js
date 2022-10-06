
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/firebase.js";
import * as dotenv from "dotenv";

dotenv.config();

//add returns to things!!!
//!!!destructure and make prettier

export const moveBet = async (gameState, docId, uid, betValue, allTheDice) => {
  let [betNumberOfDice, betFaceValue] = betValue.split(",");
  betNumberOfDice = Number(betNumberOfDice);
  betFaceValue = Number(betFaceValue);

  let [currentNumberOfDice, currentFaceValue] = gameState.currentBet.split(",");
  currentNumberOfDice = Number(currentNumberOfDice);
  currentFaceValue = Number(currentFaceValue);


  if (
    gameState.isPacifico &&
    gameState.moveNumber > 0 &&
    betFaceValue !== currentFaceValue
  ) {
    throw new Error(`pacifico, must bet same face value (${currentFaceValue})`);
  }

  if (betFaceValue < 1 || betFaceValue > 6) {
    throw new Error("Bet face value must be between 1 and 6");
  }

  if (betNumberOfDice > countDice(allTheDice)) {
    throw new Error("Bet is too high");
  }

  if (
    betNumberOfDice < currentNumberOfDice ||
    (betFaceValue <= currentFaceValue &&
      betNumberOfDice === currentNumberOfDice)
  ) {
    throw new Error("Bet value is too low");
  }

  gameState.text.push({
    type: "bet",
    text: [{style: "normal", text: `${gameState.players.find((player) => player.uid === uid).nickname} bet ${betValue}`}]
  })
  gameState.currentBet = betValue;
  gameState.moveNumber = gameState.moveNumber + 1;
  gameState.currentPlayer =
    (gameState.currentPlayer + 1) % gameState.players.length;

  await setDoc(doc(db, process.env.DB_GAMES, docId), gameState, {
    merge: true,
  });

  return 'bet accepted';

};

export const moveBS = (gameState, docId, uid, allTheDice) => {
  let [currentBetNumberOfDice, currentBetFaceValue] = gameState.currentBet
    .split(",")
    .map((string) => Number(string));

    gameState.text.push({
      type: "bs1",
      text: [{style: "normal", text: `${gameState.players.find((player) => player.uid === uid).nickname} called BS on ${gameState.players[(gameState.currentPlayer + gameState.players.length - 1) % gameState.players.length].nickname}'s bet of ${gameState.currentBet}`}]
    })
      
    const diceWithFaceValue = countDice(allTheDice, currentBetFaceValue);
    const oldTotalDice = countDice(allTheDice);

    gameState.text.push({
      type: "bs2",
      text: [{style: "normal", text: `There are ${diceWithFaceValue} dice with value ${currentBetFaceValue}`}]
    })


  if (countDice(allTheDice, currentBetFaceValue) >= currentBetNumberOfDice) {
    console.log("BS was incorrect");
    roundEndLoseDice(gameState, docId, uid, oldTotalDice);
  } else {
    console.log("BS was correct");
    roundEndLoseDice(
      gameState,
      docId,
      gameState.players[
        (gameState.currentPlayer + gameState.players.length - 1) %
          gameState.players.length
      ].uid,
      oldTotalDice
      );
    }

  return "BS was called";

};

export const moveCabbages = (gameState, docId, uid, allTheDice) => {
  const player = gameState.players.find((player) => player.uid === uid);
  
  if (player.numberOfDice === 5) {
    throw new Error("You can't move cabbages when you have 5 dice!");
  }

  const oldTotalDice = countDice(allTheDice);
  
  gameState.text.push({
    type: "cabbages1",
    text: [{style: "normal", text: `${player.nickname} called cabbages on ${gameState.players[(gameState.currentPlayer + gameState.players.length - 1) % gameState.players.length].nickname}'s bet of ${gameState.currentBet}`}]
  })

  
  let [currentBetNumberOfDice, currentBetFaceValue] = gameState.currentBet.split(",");
  currentBetNumberOfDice = Number(currentBetNumberOfDice);
  currentBetFaceValue = Number(currentBetFaceValue);

  const diceWithFaceValue = countDice(allTheDice, currentBetFaceValue);
  gameState.text.push({
    type: "cabbages2",
    text: [{style: "normal", text: `There are ${diceWithFaceValue} dice with value ${currentBetFaceValue}`}]
  })



  if (countDice(allTheDice, currentBetFaceValue) !== currentBetNumberOfDice) {
    roundEndLoseDice(gameState, docId, uid, oldTotalDice);
  } else {
    roundEndGainDice(gameState, docId, uid, oldTotalDice);
  }

  return "cabbages were moved";

};

const roundEndLoseDice = (gameState, docId, uid, oldTotalDice) => {
  const player = gameState.players.find((player) => player.uid === uid);
  const playerIndex = gameState.players.findIndex(
    (player) => player.uid === uid
  );

  player.numberOfDice--;
  console.log(`${player.name} lost a dice and now has ${player.numberOfDice} left`);  

  const playerIsOut = player.numberOfDice === 0;


  if (playerIsOut) {
    gameState.losers.push({ uid: player.uid, nickname: player.nickname });
    gameState.players.splice(playerIndex, 1);

    gameState.text.push({
      type: "eliminated",
      text: [{style: "eliminated", text: `${player.nickname} has been eliminated!`}]
    })



    console.log("player out, checking if game is over");
    if (isGameOver(gameState)) {
      gameState.isOver = true;
      console.log("game is over");

      gameState.text.push({
        type: "gameOver",
        text: [{style: "winner", text: `Game over! ${gameState.players[0].nickname} wins with ${gameState.players[0].numberOfDice} dice left!`}]
      })

    }
    setCurrentPlayerToNextPlayer(gameState, uid);
  } else {
    setCurrentPlayerToUid(gameState, uid);
  }

  if (!playerIsOut) {
  gameState.text.push({
    type: "loss",
    text: [{style: "loss", text: `${player.nickname} lost a dice and now has ${player.numberOfDice} left`}]
    })}

  gameState.round++;
  gameState.currentBet = "1,0";
  gameState.moveNumber = 0;
  
  if (gameState.isPacifico) {
    gameState.isPacifico = false;
  }

  if (player.numberOfDice === 1 && gameState.players.length > 2) {
    gameState.isPacifico = true;
    gameState.text.push({
      type: "pacifico",
      text: [{style: "normal", text: `${player.nickname} is now pacifico!`}]
    })
  }
  if (gameState.isPacifico) {
    console.log("pacifico");
  }

  
  gameState.players.forEach((player) => {
    setDoc(
      doc(db, process.env.DB_PRIVATE, `${docId}-${player.uid}`),
      { cup: rollDice(player.numberOfDice) },
      { merge: true }
      );
    });
    
    if (!gameState.isOver) {
    gameState.text.push({
      type: "round1",
      text: [{style: "bold", text: `Round ${gameState.round}: ${--oldTotalDice} dice remaining`}]
    })
    gameState.text.push({
      type: "round2",
      text: [{style: "normal", text: `${gameState.players[gameState.currentPlayer].nickname} is starting`}]
    })
  }

  setDoc(doc(db, process.env.DB_GAMES, docId), gameState, { merge: true });
};

const roundEndGainDice = (gameState, docId, uid, oldTotalDice) => {
  const player = gameState.players.find((player) => player.uid === uid);
  player.numberOfDice++;

  gameState.text.push({
    type: "gain",
    text: [{style: "gain", text: `${player.nickname} gained a dice and now has ${player.numberOfDice}`}]
    })

  setCurrentPlayerToUid(gameState, uid);

  gameState.round++;
  gameState.currentBet = "1,0";
  gameState.moveNumber = 0;

  gameState.players.forEach((player) => {
    setDoc(
      doc(db, process.env.DB_PRIVATE, `${docId}-${player.uid}`),
      { cup: rollDice(player.numberOfDice) },
      { merge: true }
    );
  });

  oldTotalDice++;
  gameState.text.push({
    type: "round1",
    text: [{style: "bold", text: `Round ${gameState.round}:`},{style: "norma", text: `${oldTotalDice} dice remaining`}]
  })
  gameState.text.push({
    type: "round2",
    text: [{style: "normal", text: `${gameState.players[gameState.currentPlayer].nickname} is starting`}]
  })

  setDoc(doc(db, process.env.DB_GAMES, docId), gameState, { merge: true });
};

//!!! change now that players are removed from array
const isGameOver = (gameState) => {
  const numberOfPlayersWithDice = gameState.players.filter(
    (player) => player.numberOfDice > 0
  ).length;

  return numberOfPlayersWithDice === 1;
};

const countDice = (allTheDice, faceValue = null) => {
  if (faceValue) {
    console.log(`there are ${allTheDice[faceValue]} ${faceValue}'s`);
    return allTheDice[faceValue];
  }

  console.log(
    `there are a total of ${Object.values(allTheDice).reduce(
      (a, b) => a + b,
      0
    )} dice`
  );
  return Object.values(allTheDice).reduce((p, c) => p + c, 0);
};

const setCurrentPlayerToUid = (gameState, uid) => {
  gameState.currentPlayer = gameState.players.findIndex(
    (player) => player.uid === uid
  );
};

const setCurrentPlayerToNextPlayer = (gameState, uid) => {
  const currentIndex = gameState.players.findIndex(
    (player) => player.uid === uid
  );
  //WARNING!!! THIS MIGHT BE WRONG
  for (let i = 1; i < gameState.players.length; i++) {
    if (
      gameState.players[(i + currentIndex) % gameState.players.length]
        .numberOfDice > 0
    ) {
      gameState.currentPlayer = i + currentIndex;
      break;
    }
  }
};


const rollDice = (numberOfDice) => {
  const dice = [];
  for (let i = 0; i < numberOfDice; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1);
  }
  return dice;
};
