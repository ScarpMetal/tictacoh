import { useAtomValue } from "jotai";
import { MouseEventHandler, useCallback, useEffect } from "react";
import {
  gameStepAtom,
  gameWinnerAtom,
  noMoreMovesAtom,
  roomAtom,
} from "~/atoms/gameAtoms";
import { SymbolDisplay } from "~/components/SymbolDisplay";
import { Modal } from "~/components/modal/Modal";
import { useRestart } from "~/utils/gameHooks";
import "./GameOverModal.scss";

export const GameOverModal = () => {
  const restart = useRestart();
  const gameStep = useAtomValue(gameStepAtom);
  const gameWinner = useAtomValue(gameWinnerAtom);
  const noMoreMoves = useAtomValue(noMoreMovesAtom);
  const room = useAtomValue(roomAtom);
  const [sendPlayAgain, getPlayAgain] = room
    ? room.makeAction("play-again")
    : [null, null];

  const handlePlayAgain: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (!sendPlayAgain) return;

      sendPlayAgain("play-again");
      restart("playing");
    }, [restart, sendPlayAgain]);

  useEffect(() => {
    if (gameStep !== "game-over") return;
    if (!getPlayAgain) return;

    getPlayAgain(() => {
      restart("playing");
    });
  }, [gameStep, getPlayAgain, restart]);

  if (gameStep !== "game-over") return null;

  return (
    <Modal>
      <div className="game-over-label">
        {gameWinner ? "Winner!" : "Game Over"}
      </div>
      {gameWinner && (
        <div className="game-over-display">
          <SymbolDisplay letter={gameWinner} />
        </div>
      )}
      {!gameWinner && noMoreMoves && (
        <div className="game-over-display">DRAW</div>
      )}
      {!gameWinner && !noMoreMoves ? <i>Game did not end?</i> : null}
      <button
        className="play-again-button"
        type="button"
        onClick={handlePlayAgain}
      >
        Play Again
      </button>
    </Modal>
  );
};
