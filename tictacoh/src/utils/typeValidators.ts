import { FrameId, PieceId } from "~/types/gameTypes";

export const validFrameId = (frameId: unknown): FrameId => {
  if (typeof frameId !== "string") {
    throw new Error("frameId must be a string");
  }
  if (!/^frame[0-8]$/.test(frameId)) {
    throw new Error('frameId must be in the form of "frame[0-8]"');
  }
  return frameId as FrameId;
};

export const validPieceId = (pieceId: unknown): PieceId => {
  if (typeof pieceId !== "string") {
    throw new Error("pieceId must be a string");
  }
  if (!/^[X|O][1-6]$/.test(pieceId)) {
    throw new Error('pieceId must be in the form of "piece[0-8]"');
  }
  return pieceId as PieceId;
};
