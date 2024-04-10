import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  gameStepAtom,
  letterStartAtom,
  letterTurnAtom,
} from "~/atoms/gameAtoms";

export const GameManagerEffect = () => {
  const gameStep = useAtomValue(gameStepAtom);
  const setSymbolStart = useSetAtom(letterStartAtom);
  const letterTurn = useAtomValue(letterTurnAtom);

  // Select which player goes first
  useEffect(() => {
    if (gameStep === "playing") {
      setSymbolStart("C");
    }
  }, [gameStep, setSymbolStart]);

  useEffect(() => {
    if (letterTurn) {
      console.log(`It's ${letterTurn === "C" ? "player" : "opponent"}'s turn`);
    } else {
      console.log("Waiting to set who goes first");
    }
  }, [letterTurn]);

  return null;
};
