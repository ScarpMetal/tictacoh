import { useAtom, useSetAtom } from "jotai";
import { RESET, useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import {
  clientSymbolAtom,
  framesAtom,
  framesAtomFamily,
  opponentIdAtom,
  opponentSymbolAtom,
  pieceMap,
  roomAtom,
  unplayedPiecesAtom,
} from "~/atoms/gameAtoms";
import { FrameId, GameStep, PieceId } from "~/types/gameTypes";

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

export const useRestart = () => {
  const [room, setRoom] = useAtom(roomAtom);
  const setUnplayedPieces = useSetAtom(unplayedPiecesAtom);
  const setFrames = useSetAtom(framesAtom);
  const setOpponentId = useSetAtom(opponentIdAtom);
  const setOpponentSymbol = useSetAtom(opponentSymbolAtom);
  const setClientSymbol = useSetAtom(clientSymbolAtom);

  return useCallback(
    (gameStep: GameStep) => {
      switch (gameStep) {
        case "playing":
          setUnplayedPieces(RESET);
          setFrames(RESET);
          break;
        case "connecting":
          setUnplayedPieces(RESET);
          setFrames(RESET);
          setOpponentId(null);
          setOpponentSymbol(null);
          break;
        case "symbol-select":
          setUnplayedPieces(RESET);
          setFrames(RESET);
          setOpponentId(null);
          setOpponentSymbol(null);
          setClientSymbol(null);
          room?.leave();
          setRoom(null);
          break;
      }
    },
    [
      room,
      setClientSymbol,
      setOpponentId,
      setOpponentSymbol,
      setRoom,
      setUnplayedPieces,
    ]
  );
};
