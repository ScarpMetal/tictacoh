import { useDroppable } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import { gameStepAtom } from "~/atoms/gameAtoms";
import { Piece } from "~/components/Piece";
import { PieceType } from "~/types/gameTypes";
import "./Pieces.scss";

export interface PiecesProps {
  symbol: "X" | "O";
  pieces: PieceType[];
}

export function Pieces({ symbol, pieces }: PiecesProps) {
  const gameStep = useAtomValue(gameStepAtom);
  const { isOver, setNodeRef } = useDroppable({
    id: `pieces${symbol}`,
  });
  return (
    <>
      <div className="pieces" ref={setNodeRef} data-is-over={isOver}>
        {gameStep === "playing" &&
          pieces.map((piece) => <Piece key={piece.id} piece={piece} />)}
      </div>
    </>
  );
}
