export default function PlayerList({ players, admin }) {
  return (
    <ul className="lobby__player-list">
      {players.map((player, index) => (
        <div key={index}>
        <li className="lobby__players-list__item" key={player.uid}>
          {`${player.nickname} ${player.uid === admin ? "(host)" : ""}`}
        </li>
        <br />
        </div>
        ))}
    </ul>
  );
}
