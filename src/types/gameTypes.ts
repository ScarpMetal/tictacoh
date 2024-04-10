export type PieceLetter = "C" | "O";
export type PieceId = `${PieceLetter}${number}`;

export interface PieceType {
  letter: PieceLetter;
  level: number;
  id: PieceId;
}

export type FrameId = `frame${number}`;

export type GameStep = "symbol-select" | "connecting" | "playing" | "game-over";
