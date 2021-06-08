import React, { useEffect } from "react";
import Game from "./game";

const GameContainer = () => {
  useEffect(() => {
    new Game(this);
  }, []);

  return <div id="gameContainer" />;
};

const GamePage = () => {
  return (
    <div>
      Test
      <GameContainer />
    </div>
  );
};

export default GamePage;
