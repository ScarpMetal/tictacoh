import { atom } from "jotai";
import { atomFamily, atomWithReset } from "jotai/utils";
import { FrameId, PieceId, PieceSymbol, PieceType } from "~/types/gameTypes";

/*
 * PLAYER / OPPONENT
 */

export const playerSymbolDisplayAtom = atom<string | null>(null);
export const opponentSymbolDisplayAtom = atom<string | null>(null);
export const symbolStartAtom = atom<PieceSymbol | null>(null);
export const symbolTurnAtom = atom<PieceSymbol | null>((get) => {
  const numPlayerPlayed = 6 - get(unplayedPiecesFamily("X")).length;
  const numOpponentPlayer = 6 - get(unplayedPiecesFamily("O")).length;
  const symbolStart = get(symbolStartAtom);
  console.log("numPlayerPlayed", numPlayerPlayed);
  console.log("numOpponentPlayer", numOpponentPlayer);
  if (!symbolStart) return null;

  if (symbolStart === "X") {
    return numPlayerPlayed <= numOpponentPlayer ? "X" : "O";
  } else {
    return numPlayerPlayed < numOpponentPlayer ? "X" : "O";
  }
});

/*
 * GAME
 */

export const gameStepAtom = atom((get) => {
  const playerSymbolDisplay = get(playerSymbolDisplayAtom);
  const opponentSymbolDisplay = get(opponentSymbolDisplayAtom);
  if (!playerSymbolDisplay) return "info";
  if (!opponentSymbolDisplay) return "connecting";
  return "playing";
});

/*
 * PIECES
 */

export const pieceMap = new Map<PieceId, PieceType>([
  ["O1", { symbol: "O", level: 1, id: "O1" }],
  ["O2", { symbol: "O", level: 2, id: "O2" }],
  ["O3", { symbol: "O", level: 3, id: "O3" }],
  ["O4", { symbol: "O", level: 4, id: "O4" }],
  ["O5", { symbol: "O", level: 5, id: "O5" }],
  ["O6", { symbol: "O", level: 6, id: "O6" }],
  ["X1", { symbol: "X", level: 1, id: "X1" }],
  ["X2", { symbol: "X", level: 2, id: "X2" }],
  ["X3", { symbol: "X", level: 3, id: "X3" }],
  ["X4", { symbol: "X", level: 4, id: "X4" }],
  ["X5", { symbol: "X", level: 5, id: "X5" }],
  ["X6", { symbol: "X", level: 6, id: "X6" }],
]);

export const unplayedPiecesAtom = atomWithReset([...pieceMap.values()]);

export const unplayedPiecesFamily = atomFamily((symbol: PieceSymbol) =>
  atom((get) =>
    get(unplayedPiecesAtom).filter((piece) => piece.symbol === symbol)
  )
);

/*
 * FRAMES
 */

export const framesAtom = atom<(PieceType | null)[]>(new Array(9).fill(null));

export const framesAtomFamily = atomFamily((frameId: FrameId) => {
  const frameIndexMatch = frameId.match(/[0-8]/);
  if (!frameIndexMatch)
    throw new Error(`Cannot extract a number 0-8 from the frameId ${frameId}`);

  const frameIndexStr = frameIndexMatch[0];
  const frameIndex = parseInt(frameIndexStr);

  return atom(
    (get) => get(framesAtom)[frameIndex],
    (_, set, piece: PieceType) =>
      set(framesAtom, (prev) =>
        prev.map((p, index) => (frameIndex === index ? piece : p))
      )
  );
});
