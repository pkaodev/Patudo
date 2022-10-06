import { apiPUTMove } from "../../../firebase/firebaseFunctionsFE"
import { useState, useEffect, useContext } from "react"
import { ContextGame } from "../../../CONTEXTS";
import { useParams } from "react-router-dom"
import { useAuth } from "../../../firebase/AuthContext"
import dice1_white from "../../../images/patudo/dice-full-white-1.png"
import dice2_white from "../../../images/patudo/dice-full-white-2.png"
import dice3_white from "../../../images/patudo/dice-full-white-3.png"
import dice4_white from "../../../images/patudo/dice-full-white-4.png"
import dice5_white from "../../../images/patudo/dice-full-white-5.png"
import dice6_white from "../../../images/patudo/dice-full-white-6.png"
import dice1_black from "../../../images/patudo/dice-full-black-1.png"
import dice2_black from "../../../images/patudo/dice-full-black-2.png"
import dice3_black from "../../../images/patudo/dice-full-black-3.png"
import dice4_black from "../../../images/patudo/dice-full-black-4.png"
import dice5_black from "../../../images/patudo/dice-full-black-5.png"
import dice6_black from "../../../images/patudo/dice-full-black-6.png"
import upArrowBlack from "../../../images/patudo/up-arrow-black.png"
import downArrowBlack from "../../../images/patudo/down-arrow-black.png"
import upArrowWhite from "../../../images/patudo/up-arrow-white.png"
import downArrowWhite from "../../../images/patudo/down-arrow-white.png"

const imgDic_white = {
  1: dice1_white,
  2: dice2_white,
  3: dice3_white,
  4: dice4_white,
  5: dice5_white,
  6: dice6_white,
}

const imgDic_black = {
  1: dice1_black,
  2: dice2_black,
  3: dice3_black,
  4: dice4_black,
  5: dice5_black,
  6: dice6_black,
}

//add pacifico logic
//-show next value with same fv
//both nod and fv arrows move nod
//disable all bet when at max value

//fade/disable all buttons when not betting
//fade/disable up/down arrows when needed



export default function Bet({isValid}) {
  const { gameState } = useContext(ContextGame);
  const { gameCode } = useParams()
  const { currentUser } = useAuth()
  const [moveObj, setMoveObj] = useState({});


  const [isWhite, setIsWhite] = useState(false);

  const switchWhite = () => {
    setIsWhite(!isWhite);
  };

  
  const totalDice = gameState.players.reduce((p, c)=>p+c.numberOfDice, 0)

  let [currentNumberOfDice, currentFaceValue] = gameState.currentBet.split(",");

  currentNumberOfDice = Number(currentNumberOfDice);
  currentFaceValue = Number(currentFaceValue);

  const currentBetValue = 6 * (currentNumberOfDice - 1) + currentFaceValue;

  //add to deal with edge case - last bet was max value
  const [betFaceValue, setBetFaceValue] = useState(1);
  const [betNumberOfDice, setBetNumberOfDice] = useState(1);
  
  useEffect(() => {
    setBetFaceValue(currentFaceValue < 6 ? currentFaceValue + 1 : 1);
    setBetNumberOfDice(currentFaceValue < 6 ? currentNumberOfDice : currentNumberOfDice + 1);
  }, [gameState])


  const nodUp = () => {
    if (isValid) {
    if (betNumberOfDice < totalDice) {
      setBetNumberOfDice(betNumberOfDice + 1);
    } else {
      setBetFaceValue(6)
    }
  }}

  const nodDown = () => {
    if (isValid) {
    if (currentBetValue + 1 <= 6 * (betNumberOfDice - 1) + betFaceValue - 6) {
      setBetNumberOfDice(betNumberOfDice - 1);
    } else {
      setBetFaceValue((currentBetValue + 1) % 6);
      setBetNumberOfDice(Math.floor((currentBetValue) / 6) + 1);
    }}

  };

  const fvUp = () => {
    if (isValid) {
    if (betFaceValue < 6) {
    setBetFaceValue(betFaceValue + 1);
    } else if (betNumberOfDice < totalDice ) {
      setBetFaceValue(1);
      setBetNumberOfDice(betNumberOfDice + 1);
    }}
  };

  const fvDown = () => {
    if (isValid) {

   if (6 * (betNumberOfDice - 1) + betFaceValue > currentBetValue + 1) {

    if (betFaceValue > 1) {
      setBetFaceValue(betFaceValue - 1);
    } else {
    setBetFaceValue(6);
    setBetNumberOfDice(betNumberOfDice - 1);
    }
  }}
  };

  const [upArrowDisabled, setUpArrowDisabled] = useState(false);
  const [downArrowDisabled, setDownArrowDisabled] = useState(false);

  useEffect(() => {
    setUpArrowDisabled(betNumberOfDice === totalDice && betFaceValue === 6);
  }, [betFaceValue, betNumberOfDice, totalDice]);

  useEffect(() => {
    setDownArrowDisabled(currentBetValue + 1 === 6 * (betNumberOfDice - 1) + betFaceValue);
  }, [betFaceValue, betNumberOfDice]);




  useEffect(() => {

    setMoveObj({
      moveNumber: gameState.moveNumber + 1,
      moveType: "bet",
      betValue: `${betNumberOfDice},${betFaceValue}`
    })
  }, [betNumberOfDice, betFaceValue])

  return (
    <div className={`bet-holder flex-row`}>
      <div className="flex-column">
        <img src={upArrowWhite} className={`bet__arrow ${upArrowDisabled ? 'opacity-50' : ''} ${!isValid ? 'opacity-50' : ''}`} onClick={nodUp} />
        <div className="bet__number-of-dice-holder flex-row">
        <p className={`bet__number-of-dice ${!isValid ? 'opacity-50' : ''}`}>{`${betNumberOfDice}`} X</p>
        </div>
        <img src={downArrowWhite} className={`bet__arrow ${downArrowDisabled ? 'opacity-50' : ''} ${!isValid ? 'opacity-50' : ''}`} onClick={nodDown} />
      </div>
      <div className="flex-column">
      <img src={upArrowBlack} className={`bet__arrow ${upArrowDisabled ? 'opacity-50' : ''} ${!isValid ? 'opacity-50' : ''}`} onClick={fvUp} />
        <img src={isWhite ? imgDic_white[betFaceValue] : imgDic_black[betFaceValue]} className={`bet__dice ${!isValid ? 'opacity-50' : ''}`} onClick={switchWhite} />
        <img src={downArrowBlack} className={`bet__arrow ${downArrowDisabled ? 'opacity-50' : ''} ${!isValid ? 'opacity-50' : ''}`} onClick={fvDown} />
      </div>
      <button disabled={!isValid} className={`${!isValid ? 'faded-text' : ''}`} onClick={(e) => {if (isValid) apiPUTMove(e, currentUser, gameCode, moveObj)}}>Bet</button>
    </div>
    )
  }
