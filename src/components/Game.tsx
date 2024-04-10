import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo } from "react";
import {
  gameStepAtom,
  roomAtom,
  unplayedPiecesFamily,
} from "~/atoms/gameAtoms";
import { Frame } from "~/components/Frame";
import { Pieces } from "~/components/Pieces";
import { FrameId, PieceId } from "~/types/gameTypes";
import { useTryPlacePiece } from "~/utils/gameHooks";
import { validFrameId, validPieceId } from "~/utils/typeValidators";
import "./Game.scss";

export function Game() {
  const gameStep = useAtomValue(gameStepAtom);
  const room = useAtomValue(roomAtom);
  const oPieces = useAtomValue(unplayedPiecesFamily("O"));
  const xPieces = useAtomValue(unplayedPiecesFamily("C"));
  const tryPlacePiece = useTryPlacePiece();
  const [sendPlayedPiece, getPlayedPiece] = useMemo(
    () =>
      room
        ? room.makeAction<{ pieceId: PieceId; frameId: FrameId }>(
            "played-piece"
          )
        : [null, null],
    [room]
  );

  useEffect(() => {
    if (gameStep !== "playing") return;
    if (!getPlayedPiece) return;

    getPlayedPiece(({ pieceId, frameId }) => {
      const num = parseInt(pieceId.slice(1));
      const clientPieceId: PieceId =
        pieceId.charAt(0) === "C" ? `O${num}` : `C${num}`;
      tryPlacePiece(clientPieceId, frameId);
    });
  }, [gameStep, getPlayedPiece, tryPlacePiece]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      // Check that drop happened over a droppable frame
      if (!event.over?.id || !String(event.over.id).startsWith("frame")) return;
      if (!sendPlayedPiece) return;

      // Validate pieceId and frameId are in the correct format
      const pieceId = validPieceId(event.active.id);
      const frameId = validFrameId(event.over.id);

      const success = tryPlacePiece(pieceId, frameId);
      if (success) {
        sendPlayedPiece({ pieceId, frameId });
        console.log(`Placed ${pieceId} in ${frameId}`);
      } else {
        console.log(`Could not place ${pieceId} in ${frameId}`);
      }
    },
    [sendPlayedPiece, tryPlacePiece]
  );

  if (gameStep !== "playing") return null;

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
        <Pieces symbol="C" pieces={xPieces} />
        <div className="spacer" />
      </div>
    </DndContext>
  );
}
