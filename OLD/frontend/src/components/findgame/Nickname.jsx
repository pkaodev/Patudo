import { useContext } from "react";
import {ContextFindGame} from "../../CONTEXTS";

export default function Nickname({props: {nickname, setNickname}}) {

  const handleNicknameChange = (e) => {
    const validNickname = /^[a-z0-9]{0,13}$/i;
    if (validNickname.test(e.target.value)) {
      setNickname(e.target.value);
    }
  };
  return (
    <div className="nickname flex-column">
      <label className="padding-m" htmlFor="nickname__input">Pick a nickname</label>
      <input
        id="nickname__input"
        className="nickname__input"
        type="text"
        value={nickname}
        maxLength={7}
        //!!!this isn't doing anything
        minLength={1}
        onChange={(e) => handleNicknameChange(e)}
      />
    </div>
  );
}
