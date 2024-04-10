import { Game } from "~/components/Game";
import { GameManagerEffect } from "~/components/effects/GameManagerEffect";
import { ConnectingModal, GameOverModal } from "~/components/modal";
import { SymbolSelectModal } from "~/components/modal/symbol-select/SymbolSelectModal";
import "./App.scss";

export function App() {
  return (
    <>
      <GameManagerEffect />
      <SymbolSelectModal />
      <ConnectingModal />
      <GameOverModal />
      <Game />
    </>
  );
}
