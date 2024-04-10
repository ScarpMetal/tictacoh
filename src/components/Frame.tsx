import { useDroppable } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { framesAtomFamily } from "~/atoms/gameAtoms";
import { SymbolDisplay } from "~/components/SymbolDisplay";
import { useCanPlacePieceInFrame } from "~/utils/gameHooks";
import { validFrameId, validPieceId } from "~/utils/typeValidators";
import "./Frame.scss";

export interface FrameProps {
  index: number;
}

export function Frame({ index }: FrameProps) {
  const canPlacePieceInFrame = useCanPlacePieceInFrame();
  const frameId = useMemo(() => validFrameId(`frame${index}`), [index]);
  const piece = useAtomValue(framesAtomFamily(frameId));
  const { setNodeRef, active } = useDroppable({
    id: frameId,
    data: { index, piece },
  });

  const canPlace = useMemo(() => {
    if (!active) return null;
    const pieceId = validPieceId(active.id);
    return canPlacePieceInFrame(pieceId, frameId);
  }, [active, canPlacePieceInFrame, frameId]);

  return (
    <div className="frame" ref={setNodeRef} data-can-place={canPlace}>
      {piece?.letter && (
        <span className="piece" data-level={piece.level}>
          <SymbolDisplay letter={piece.letter} />
        </span>
      )}
    </div>
  );
}
