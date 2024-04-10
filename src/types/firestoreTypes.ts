import { Timestamp } from "firebase/firestore";

export interface GameType {
  uid: string;
  gameCreateAt: Timestamp;
  gameEndAt?: Timestamp;
  gameStartAt?: Timestamp;
  opponentId?: string;
  playerId: string;
  winningPlayerId?: string;
}

export function isGameType(game: unknown): game is GameType {
  return (
    !!game &&
    "gameCreateAt" in (game as GameType) &&
    "playerId" in (game as GameType)
  );
}

export interface PlayerType {
  // id: string;
  symbol: string;
}

export interface ClientPlayerType extends PlayerType {
  // peer: Peer;
}

export interface OpponentPlayerType extends PlayerType {
  // conn: DataConnection;
}
