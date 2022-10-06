
import avatar from "../../../images/patudo/avatar.png";
import king_white from "../../../images/patudo/king-white.png";
import dice_q_white from "../../../images/patudo/dice-q-white.png";

export default function Opponent({ props: { player, isCurrent, isOver } }) {

  //!!!put loader here
  if (isOver === null) {
    return (<></>);
  }

  return (
    <div
      className={`opponent-holder ${isCurrent ? "current-border" : ""} flex-column`}
    >
      <img className="opponent__avatar flex-column" src={!isOver ? avatar : king_white}></img>
      <div className="opponent__nickname">{player.nickname}</div>
      <div className="opponent__dice-holder flex-row">
        {Array.from(Array(player.numberOfDice)).map((value, index) => {
          return <img key={index} className="opponent__dice--q" src={dice_q_white}></img>;
        })}
        {/* <div className="opponent__text">{player.message.text}</div> */}
      </div>
    </div>
  );
}
