import { ContextGame } from "../../../CONTEXTS";
import { useContext } from "react";

export default function InfoArea() {
  const { gameState } = useContext(ContextGame);

  return (
  <div className="info-area-holder flex-column" >
    <div className={`info-area flex-column`} >
      <div className="info-area__round">Round: {gameState.round}</div>
      {/*add in opposite order due to column-reverse style */}
      <div className="info-area__text-holder">
        {gameState.text.map((textObj) => {
          return (<>
            <div className="info-area__text-line">
              {
              textObj.type === "gameOver" ?
                <p className="ia-text-frag ia-winner">{textObj.text[0].text}</p> :
              textObj.text.map((text) => {
                return <p className={`ia-text-frag ia-${text.style}`}>{text.text}</p>})
                }
            </div>
            </>)
        }).reverse()}
    </div>
  </div>
  </div>);
}
