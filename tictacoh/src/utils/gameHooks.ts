import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import {
  framesAtomFamily,
  pieceMap,
  unplayedPiecesAtom,
} from "~/atoms/gameAtoms";
import { FrameId, PieceId } from "~/types/gameTypes";

export const useCanPlacePieceInFrame = () => {
  return useAtomCallback(
    useCallback((get, _, pieceId: PieceId, frameId: FrameId) => {
      const frame = get(framesAtomFamily(frameId));
      if (!frame) return true;

      const piece = pieceMap.get(pieceId);
      if (!piece) return false;

      return frame.level < piece.level;
    }, [])
  );
};

export const useTryPlacePiece = () => {
  const canPlacePieceInFrame = useCanPlacePieceInFrame();

  return useAtomCallback(
    useCallback(
      (get, set, pieceId: PieceId, frameId: FrameId) => {
        const unplayedPieces = get(unplayedPiecesAtom);

        // Check that piece has a greater level than the piece currently in the frame
        if (!canPlacePieceInFrame(pieceId, frameId)) return false;

        // Check that dropped piece is unplayed
        const piece = unplayedPieces.find((piece) => piece.id === pieceId);
        if (!piece) return false;

        // Remove dropped piece from unplayed pieces
        set(unplayedPiecesAtom, (prev) =>
          prev.filter((piece) => piece.id !== pieceId)
        );

        // Add piece to frame
        set(framesAtomFamily(frameId), piece);

        return true;
      },
      [canPlacePieceInFrame]
    )
  );
};
