export type PieceSymbol = "X" | "O";
export type PieceLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type PieceId = `${PieceSymbol}${PieceLevel}`;

export interface PieceType {
  symbol: PieceSymbol;
  level: PieceLevel;
  id: PieceId;
}

export type FrameIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type FrameId = `frame${FrameIndex}`;
