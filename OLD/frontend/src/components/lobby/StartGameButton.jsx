import React from 'react'
import { handleCreateGame } from '../../firebase/firebaseFunctionsFE'

export default function StartGameButton( {props}) {
  const { lobbyState, lobbyCode } = props;

  return (
    <button onClick={(e)=>{handleCreateGame(e, lobbyState, lobbyCode)}}>Start game</button >
  )
}
