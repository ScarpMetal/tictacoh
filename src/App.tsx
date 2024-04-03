import { useAtomValue } from "jotai";
import { gameStepAtom } from "~/atoms/gameAtoms";
import { ConnectingModal } from "~/components/ConnectingModal";
import { Game } from "~/components/Game";
import { SymbolSelectModal } from "~/components/SymbolSelectModal";
import { GameManagerEffect } from "~/components/effects/GameManagerEffect";
import "./App.scss";

export function App() {
  const gameStep = useAtomValue(gameStepAtom);

  return (
    <>
      <GameManagerEffect />
      {gameStep === "symbol-select" && <SymbolSelectModal />}
      {gameStep === "connecting" && <ConnectingModal />}
      <Game />
    </>
  );
}
