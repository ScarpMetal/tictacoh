export type PieceLetter = "C" | "O";
export type PieceId = `${PieceLetter}${number}`;

export interface PieceType {
  letter: PieceLetter;
  level: PieceLevel;
  id: PieceId;
}

export type FrameId = `frame${number}`;
