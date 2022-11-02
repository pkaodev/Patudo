import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
/**
 * checks etc to do:
 * - check if lobby code is unique
 * - check if user is already in a lobby?
 * - check if user is already in a game?
 * - check if lobby code is already being used
 */
/**
 * - check if user is already in a lobby
 * - check if user is already in a game
 * - check if user is banned from lobby
 * - check if user is in lobby
 */

/**
 * checks etc to do:
 * - if lobby is full --> err msg
 * - if user is already in lobby --> redirect
 * - if user is banned --> err msg
 * - if game has started --> check if in in --> redirect/err msg
 */
/**
 * checks etc to do:
 * - ready status?
 */
const utilMakeLobbyCode = () => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let lobbyCode = "";
  for (let i = 0; i < 4; i++) {
    lobbyCode += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return lobbyCode;
};

//Richard Durstenfeld - Fisher-Yates shuffle
//https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
const utilShuffleArray = (array) => {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
};

export const handleMakeLobby = async (e, uid, nickname, navigate) => {
  e.preventDefault();
  try {
    const lobbyCode = utilMakeLobbyCode()

    const lobbyObj = {
      createdAt: new Date(),
      admin: uid,
      players: [{ uid, nickname }],
      hasStarted: false,
  };
    const docRef = await setDoc(
      doc(db, import.meta.env.VITE_DB_LOBBIES, lobbyCode),
      lobbyObj
    );

    navigate(`/Patudo-v0/lobby/${lobbyCode}`);

  } catch (e) {
    console.error("ERROR-handleMakeLobby", e);
  }
};

//both auto - return unsub and put in useEffect!!!
export const autoSubscribeToLobby = async (lobbyCode, uid, setLobbyState) => {
  try {
    const docSnap = await getDoc(doc(db, import.meta.env.VITE_DB_LOBBIES, lobbyCode));
    const lobbyObj = docSnap.data();

    //if user is in lobby, subscribe to lobby
    if (lobbyObj.players.some((player) => player.uid === uid)) {
    
      const unsub = onSnapshot(
        doc(db, import.meta.env.VITE_DB_LOBBIES, lobbyCode),
        (doc) => {
          const newLobbyState = Object.assign({}, doc.data());
          setLobbyState(newLobbyState);
        }
      );

    }

  } catch (e) {
    console.error("ERROR-autoSubscribeToLobby", e);
  }
};

export const handleJoinLobby = async (
  e,
  lobbyCode,
  uid,
  nickname,
  navigate
) => {
  e.preventDefault();

  try {
    const docSnap = await getDoc(doc(db, import.meta.env.VITE_DB_LOBBIES, lobbyCode));

    const lobbyObj = docSnap.data();

    //add user to lobby then update doc if they aren't already in it and not full
    if (lobbyObj.players.length < 7 && !lobbyObj.players.some((p) => p.uid === uid)) {
      lobbyObj.players.push({ uid, nickname });
      await setDoc(doc(db, import.meta.env.VITE_DB_LOBBIES, lobbyCode), lobbyObj);
    }

    //navigate to '/lobby/:lobbyCode'
    navigate(`/Patudo-v0/lobby/${lobbyCode}`);
  } catch (e) {
    console.error("ERROR-handleJoinLobby", e);
  }
};

export const handleCreateGame = async (e, lobbyState, lobbyCode) => {
  e.preventDefault();

  try {

    //public game state object
    const gameObj = {};
    /*
    !!!maybe redo to simple {style: xx, text: xx} text obj
      text array format
      {{type: "round/bet/bs/cabbages/loss/gain/eliminated",
       text: [{style: "normal/bold/loss/gain/eliminated/winner", text: "thetext"}, {...}...]
      }}
    */
    gameObj.text=[{type: "round", text: [{style: "bold", text: "Round 1:"}, {style: "normal", text: `${lobbyState.players.length * 5} dice remaining`}]}];
    gameObj.createdAt = new Date();
    gameObj.round = 1;

    //prevents multiple conflicting legal game moves if sent at the same time
    gameObj.moveNumber = 0;
    //refers to players array index
    gameObj.currentPlayer = 0;
    gameObj.currentBet = "1,0";
    gameObj.isPacifico = false;
    gameObj.isOver = false;
    gameObj.admin = lobbyState.admin;
    gameObj.losers = [];
    gameObj.players = utilShuffleArray(lobbyState.players
      .map((player) => {
        return {
          uid: player.uid,
          nickname: player.nickname,
          numberOfDice: 5,
        };
      }))

    //private dice value collection
    gameObj.players.forEach((player) => {
      const privateObj = {};
      privateObj.gameCode = lobbyCode;
      privateObj.cup = [];
      for (let i = 0; i < 5; i++) {
        privateObj.cup.push(Math.floor(Math.random() * 6) + 1);
      }
      setDoc(
        //private document name is 'gameCode-uid'
        doc(db, import.meta.env.VITE_DB_PRIVATE, `${lobbyCode}-${player.uid}`),
        privateObj
      );
    });

    setDoc(doc(db, import.meta.env.VITE_DB_GAMES, lobbyCode), gameObj);

    await setDoc(
      doc(db, import.meta.env.VITE_DB_LOBBIES, lobbyCode),
      { gameHasStarted: true },
      { merge: true }
    );
  } catch (e) {
    console.error("ERROR-handleCreateGame", e);
  }
};

export const autoSubscribeToGame = async (gameCode, uid, setGameState) => {
  try {
    const docSnap = await getDoc(doc(db, import.meta.env.VITE_DB_GAMES, gameCode));
    if (docSnap.exists()) {
      const unsub = onSnapshot(
        doc(db, import.meta.env.VITE_DB_GAMES, gameCode),
        (doc) => {
          const newGameState = Object.assign({}, doc.data());
          setGameState(newGameState);
        }
      );
    }
    
  } catch (e) {
    console.error("ERROR-autoSubscribeToGame", e);
  }
};

export const autoSubscribeToPrivate = async (gameCode, uid, setPrivateState) => {
  try {

    const unsub = await onSnapshot(
      doc(db, import.meta.env.VITE_DB_PRIVATE, `${gameCode}-${uid}`),
      (doc) => {
        setPrivateState(doc.data().cup);
      }
    );

  } catch (e) {
    console.error("ERROR-autoSubscribeToPrivate", e);
  }
};

export const apiPUTMove = async (e, currentUser, gameCode, moveObject) => {
  e.preventDefault();
 
  try {
    const { moveNumber, moveType, betValue } = moveObject;

    const token = await currentUser.getIdToken(/* forceRefresh */ true);

    //for development locally
    // const resStream = await fetch(import.meta.env.VITE_API_ADDRESS_DEVELOPMENT, {

    //for production
    const resStream = await fetch(import.meta.env.VITE_API_ADDRESS, {
      
    method: "PUT",
      body: JSON.stringify({ gameCode, moveNumber, moveType, betValue }),
      headers: new Headers({
        "Content-Type": "application/json",
        patauthtoken: token,
        patauthuid: currentUser.uid,
      }),
    });

    //HANDLE THIS RETURN!!!
    // console.log('PUT RETURN: ', resStream.json())

  } catch (e) {
    console.error("ERROR-apiPUTMove", e);
  }
};
