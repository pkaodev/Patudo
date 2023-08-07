import dice1_white from "../../../images/patudo/dice-full-white-1.png";
import dice2_white from "../../../images/patudo/dice-full-white-2.png";
import dice3_white from "../../../images/patudo/dice-full-white-3.png";
import dice4_white from "../../../images/patudo/dice-full-white-4.png";
import dice5_white from "../../../images/patudo/dice-full-white-5.png";
import dice6_white from "../../../images/patudo/dice-full-white-6.png";
import dice1_black from "../../../images/patudo/dice-full-black-1.png";
import dice2_black from "../../../images/patudo/dice-full-black-2.png";
import dice3_black from "../../../images/patudo/dice-full-black-3.png";
import dice4_black from "../../../images/patudo/dice-full-black-4.png";
import dice5_black from "../../../images/patudo/dice-full-black-5.png";
import dice6_black from "../../../images/patudo/dice-full-black-6.png";

const imgDic_white = {
  1: dice1_white,
  2: dice2_white,
  3: dice3_white,
  4: dice4_white,
  5: dice5_white,
  6: dice6_white,
};

const imgDic_black = {
  1: dice1_black,
  2: dice2_black,
  3: dice3_black,
  4: dice4_black,
  5: dice5_black,
  6: dice6_black,
};

export default function OwnDice({ props: {faceValue, isWhite} }) {
  return <img className="own-dice" src={isWhite ? imgDic_white[faceValue] : imgDic_black[faceValue]} alt={faceValue} />;
}
