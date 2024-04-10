import { atom } from "jotai";
import { atomFamily, atomWithReset } from "jotai/utils";
import { Room, selfId } from "trystero";
import { FrameId, PieceId, PieceLetter, PieceType } from "~/types/gameTypes";

/*
 * PLAYERS
 * CLIENT & OPPONENT
 */

export const clientPlayerSymbolAtom = atom<string | null>(null);
export const clientPlayerIdAtom = atom<string>(() => selfId);
export const opponentPlayerSymbolAtom = atom<string | null>(null);
export const opponentPlayerIdAtom = atom<string | null>(null);

export const letterStartAtom = atom<PieceLetter | null>(null);
export const letterTurnAtom = atom<PieceLetter | null>((get) => {
  const numPlayerPlayed = 6 - get(unplayedPiecesFamily("C")).length;
  const numOpponentPlayer = 6 - get(unplayedPiecesFamily("O")).length;
  const letterStart = get(letterStartAtom);
  console.log("numPlayerPlayed", numPlayerPlayed);
  console.log("numOpponentPlayer", numOpponentPlayer);
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

export const roomAtom = atom<Room | null>(null);
export const gameStepAtom = atom((get) => {
  const clientSymbol = get(clientPlayerSymbolAtom);
  const opponentSymbol = get(opponentPlayerSymbolAtom);
  const opponentId = get(opponentPlayerIdAtom);

  if (!clientSymbol) return "symbol-select";
  if (!opponentSymbol || !opponentId) return "connecting";
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
