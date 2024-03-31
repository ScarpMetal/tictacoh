import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { unplayedPiecesFamily } from "~/atoms/gameAtoms";
import { Frame } from "~/components/Frame";
import { Pieces } from "~/components/Pieces";
import { useTryPlacePiece } from "~/utils/gameHooks";
import { validFrameId, validPieceId } from "~/utils/typeValidators";
import "./Game.scss";

export function Game() {
  const oPieces = useAtomValue(unplayedPiecesFamily("O"));
  const xPieces = useAtomValue(unplayedPiecesFamily("X"));
  const tryPlacePiece = useTryPlacePiece();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      // Check that drop happened over a droppable frame
      if (!event.over) return;

      // Validate pieceId and frameId are in the correct format
      const pieceId = validPieceId(event.active.id);
      const frameId = validFrameId(event.over.id);

      const success = tryPlacePiece(pieceId, frameId);
      if (success) {
        console.log(`Placed ${pieceId} in ${frameId}`);
      } else {
        console.log(`Could not place ${pieceId} in ${frameId}`);
      }
    },
    [tryPlacePiece]
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="game">
        <div className="spacer" />
        <Pieces symbol="O" pieces={oPieces} />
        <div className="frames-container">
          <div className="frames">
            <Frame index={0} />
            <Frame index={1} />
            <Frame index={2} />
            <Frame index={3} />
            <Frame index={4} />
            <Frame index={5} />
            <Frame index={6} />
            <Frame index={7} />
            <Frame index={8} />
          </div>
        </div>
        <Pieces symbol="X" pieces={xPieces} />
        <div className="spacer" />
      </div>
    </DndContext>
  );
}
