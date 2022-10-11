import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./style.css";
import Navbar from "./components/navbar/Navbar";
import PAGE_Home from "./components/PAGE_Home";
import PAGE_LoginRegister from "./components/authentication/PAGE_LoginRegister";
import PAGE_FindGame from "./components/findgame/PAGE_FindGame";
import PAGE_Lobby from "./components/lobby/PAGE_Lobby";
import PAGE_Game from "./components/game/PAGE_Game";
import { AuthProvider } from "./firebase/AuthContext";
import { useEffect, useState } from "react";

import ReactAudioPlayer from "react-audio-player";
import Song0 from "./audio/Song0.mp3";
import Song1 from "./audio/Song1.mp3";
import Song2 from "./audio/Song2.mp3";
import Song3 from "./audio/Song3.mp3";
import Song4 from "./audio/Song4.mp3";
import Song5 from "./audio/Song5.mp3";
import Song6 from "./audio/Song6.mp3";
import Song7 from "./audio/Song7.mp3";
import Song8 from "./audio/Song8.mp3";

console.log(ReactAudioPlayer)

const songArray = [
  Song0,
  Song1,
  Song2,
  Song3,
  Song4,
  Song5,
  Song6,
  Song7,
  Song8,
];

export default function AppRouter() {
  const [appBGState, setAppBGState] = useState(0);
  const [songNum, setSongNum] = useState(0);

  useEffect(() => {
    setSongNum(Math.floor(Math.random() * songArray.length));
  }, [appBGState]);

  const nextSong = () => {
    setSongNum((songNum + 1) % songArray.length);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className={`app-background app-bg-${appBGState}`}></div>
        <div className="app-router">
          <Navbar BGProps={{ appBGState, setAppBGState }} />
          <div className="main-holder">
            <Routes>
              <Route path="/home" element={<PAGE_Home />} />
              <Route path="/login-register" element={<PAGE_LoginRegister />} />
              <Route path="/find-game" element={<PAGE_FindGame />} />
              <Route path="/lobby/:lobbyCode" element={<PAGE_Lobby />} />
              <Route path="/game/:gameCode" element={<PAGE_Game />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
        { appBGState && <ReactAudioPlayer
          src={songArray[songNum]}
          onEnded={nextSong}
          autoPlay
        />}
      </AuthProvider>
    </BrowserRouter>
  );
}
