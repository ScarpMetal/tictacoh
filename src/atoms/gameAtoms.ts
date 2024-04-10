import { atom } from "jotai";
import { atomFamily, atomWithReset } from "jotai/utils";
import { Room, selfId } from "trystero";
import {
  FrameId,
  GameStep,
  PieceId,
  PieceLetter,
  PieceType,
} from "~/types/gameTypes";

/*
 * PLAYERS
 * CLIENT & OPPONENT
 */

export const clientIdAtom = atom<string>(() => selfId);
export const clientSymbolAtom = atom<string | null>(null);
export const opponentIdAtom = atom<string | null>(null);
export const opponentSymbolAtom = atom<string | null>(null);

export const letterStartAtom = atom<PieceLetter | null>(null);
export const letterTurnAtom = atom<PieceLetter | null>((get) => {
  const numPlayerPlayed = 6 - get(unplayedPiecesFamily("C")).length;
  const numOpponentPlayer = 6 - get(unplayedPiecesFamily("O")).length;
  const letterStart = get(letterStartAtom);

  if (!letterStart) return null;

  if (letterStart === "C") {
    return numPlayerPlayed <= numOpponentPlayer ? "C" : "O";
  } else {
    return numPlayerPlayed < numOpponentPlayer ? "C" : "O";
  }
});

/*
 * GAME
 */

function threeInARow(
  r1: PieceType | null,
  r2: PieceType | null,
  r3: PieceType | null
) {
  return r1 && r1.letter === r2?.letter && r2?.letter === r3?.letter
    ? r1.letter
    : null;
}

function canPlacePieceOnBoard(piece: PieceType, frames: (PieceType | null)[]) {
  return frames.some((frame) => !frame || frame.level < piece.level);
}

export const roomAtom = atom<Room | null>(null);
export const gameWinnerAtom = atom((get) => {
  const [f1, f2, f3, f4, f5, f6, f7, f8, f9] = get(framesAtom);
  const results = [
    threeInARow(f1, f2, f3), // row top
    threeInARow(f4, f5, f6), // row middle
    threeInARow(f7, f8, f9), // row bottom
    threeInARow(f1, f4, f7), // col left
    threeInARow(f2, f5, f8), // col middle
    threeInARow(f3, f6, f9), // col right
    threeInARow(f1, f5, f9), // diagonal TL -> BR
    threeInARow(f7, f5, f3), // diagonal BL -> TR
  ];
  const winningResults = results.filter((x): x is PieceLetter => Boolean(x));
  if (!winningResults.length) {
    return null;
  }

  return winningResults[0];
});

export const noMoreMovesAtom = atom((get) => {
  const letterTurn = get(letterTurnAtom);
  if (!letterTurn) return null;
  const letterPiecesRemaining = get(unplayedPiecesFamily(letterTurn));
  const frames = get(framesAtom);
  const noMoreMoves = !letterPiecesRemaining.some((piece) =>
    canPlacePieceOnBoard(piece, frames)
  );
  return noMoreMoves;
});

export const gameOverAtom = atom((get) => {
  const gameWinner = get(gameWinnerAtom);
  if (gameWinner) {
    return true;
  }

  const noMoreMoves = get(noMoreMovesAtom);
  if (noMoreMoves) {
    return true;
  }

  return false;
});

export const gameStepAtom = atom((get): GameStep => {
  const clientSymbol = get(clientSymbolAtom);
  const opponentSymbol = get(opponentSymbolAtom);
  const opponentId = get(opponentIdAtom);
  const gameOver = get(gameOverAtom);
  if (!clientSymbol) return "symbol-select";
  if (!opponentSymbol || !opponentId) return "connecting";
  if (gameOver) return "game-over";
  return "playing";
});

/*
 * PIECES
 */

export const pieceMap = new Map<PieceId, PieceType>([
  ["O1", { letter: "O", level: 1, id: "O1" }],
  ["O2", { letter: "O", level: 2, id: "O2" }],
  ["O3", { letter: "O", level: 3, id: "O3" }],
  ["O4", { letter: "O", level: 4, id: "O4" }],
  ["O5", { letter: "O", level: 5, id: "O5" }],
  ["O6", { letter: "O", level: 6, id: "O6" }],
  ["C1", { letter: "C", level: 1, id: "C1" }],
  ["C2", { letter: "C", level: 2, id: "C2" }],
  ["C3", { letter: "C", level: 3, id: "C3" }],
  ["C4", { letter: "C", level: 4, id: "C4" }],
  ["C5", { letter: "C", level: 5, id: "C5" }],
  ["C6", { letter: "C", level: 6, id: "C6" }],
]);

export const unplayedPiecesAtom = atomWithReset([...pieceMap.values()]);

export const unplayedPiecesFamily = atomFamily((letter: PieceLetter) =>
  atom((get) =>
    get(unplayedPiecesAtom).filter((piece) => piece.letter === letter)
  )
);

/*
 * FRAMES
 */

export const framesAtom = atomWithReset<(PieceType | null)[]>(
  new Array(9).fill(null)
);

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
