import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  gameStepAtom,
  symbolStartAtom,
  symbolTurnAtom,
} from "~/atoms/gameAtoms";

export const GameManagerEffect = () => {
  const gameStep = useAtomValue(gameStepAtom);
  const setSymbolStart = useSetAtom(symbolStartAtom);
  const symbolTurn = useAtomValue(symbolTurnAtom);

  // Select which player goes first
  useEffect(() => {
    if (gameStep === "playing") {
      setSymbolStart("X");
    }
  }, [gameStep, setSymbolStart]);

  useEffect(() => {
    if (symbolTurn) {
      console.log(`It's ${symbolTurn === "X" ? "player" : "opponent"}'s turn`);
    } else {
      console.log("Waiting to set who goes first");
    }
  }, [symbolTurn]);

  return null;
};
