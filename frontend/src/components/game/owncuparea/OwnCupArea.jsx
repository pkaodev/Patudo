import OwnDice from "./OwnDice";
import { useContext, useState } from "react";
import { ContextGame } from "../../../CONTEXTS";

export default function OwnCupArea() {


  const { privateState } = useContext(ContextGame);

  const [isWhiteArray, setisWhiteArray] = useState(privateState.map(()=>false));

  const shuffleWhiteArray = () => {
    setisWhiteArray(privateState.map(()=>Math.random() < 0.5));
  }



  return (
    <div className="own-cup-area-holder flex-row">
      <div className="own-cup-area flex-row" onClick={shuffleWhiteArray}>
        {privateState.map((faceValue, index) => {
          return <OwnDice key={index} props={{faceValue, isWhite: isWhiteArray[index]}} />;
        })}
      </div>
    </div>
  );
}
