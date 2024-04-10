import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { gameStepAtom, letterStartAtom, roomAtom } from "~/atoms/gameAtoms";
import { useRestart } from "~/utils/gameHooks";

export const GameManagerEffect = () => {
  const restart = useRestart();
  const room = useAtomValue(roomAtom);
  const gameStep = useAtomValue(gameStepAtom);
  const setSymbolStart = useSetAtom(letterStartAtom);

  // Select which player goes first
  useEffect(() => {
    if (gameStep === "playing") {
      setSymbolStart("C");
    }
  }, [gameStep, setSymbolStart]);

  // Handle player leaving the room
  useEffect(() => {
    room?.onPeerLeave(() => {
      restart("connecting");
    });
  }, [restart, room]);

  return null;
};
