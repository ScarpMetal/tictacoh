import { useAtom, useAtomValue } from "jotai";
import {
  gameStepAtom,
  opponentSymbolDisplayAtom,
  playerSymbolDisplayAtom,
} from "~/atoms/gameAtoms";
import { Game } from "~/components/Game";
import { Modal } from "~/components/Modal";
import "./App.scss";

const selectableSymbolDisplays = [
  "❌",
  "⭕",
  "🐔",
  "🥚",
  "🐶",
  "😸",
  "🏈",
  "⚽",
  "🌞",
  "🌝",
  "❄️",
  "🔥",
  "🚄",
  "🛻",
  "🍆",
  "🍑",
];

export function App() {
  const [playerSymbolDisplay, setPlayerSymbolDisplay] = useAtom(
    playerSymbolDisplayAtom
  );
  const [opponentSymbolDisplay, setOpponentSymbolDisplay] = useAtom(
    opponentSymbolDisplayAtom
  );

  const gameStep = useAtomValue(gameStepAtom);

  return (
    <>
      {gameStep === "info" && (
        <Modal>
          <div className="symbol-select-label">Select your symbol</div>
          <div className="symbol-select">
            {selectableSymbolDisplays.map((symbol, index) => (
              <button
                key={index}
                type="button"
                className="selectable-symbol"
                onClick={() => setPlayerSymbolDisplay(symbol)}
              >
                {symbol}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {gameStep === "connecting" && (
        <Modal>
          <div className="connecting-label">
            Connecting to opponent
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
          <div className="opponent-symbol-loading">
            {selectableSymbolDisplays.map((symbol, index) => (
              <div key={index} onClick={() => setOpponentSymbolDisplay(symbol)}>
                {symbol}
              </div>
            ))}
          </div>
          <div className="vs">vs</div>
          <div className="player-selected-symbol">{playerSymbolDisplay}</div>
        </Modal>
      )}

      <Game />
    </>
  );
}
