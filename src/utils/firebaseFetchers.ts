import { doc, getDoc } from "firebase/firestore";
import { db } from "~/config/firebase";
import { PlayerType } from "~/types/firestoreTypes";

export async function fetchPlayer(playerId: string) {
  let player: PlayerType | null = null;

  try {
    const playerRef = doc(db, `players/${playerId}`);
    const snapshot = await getDoc(playerRef);
    player = (snapshot.data() as PlayerType) || null;
    if (!player) {
      console.log(
        `No player data found in firestore for player id: ${playerId}`
      );
    }
  } catch (error) {
    console.error(error);
  }
  console.log(`Fetched player with id=${playerId}`, player);
  return player;
}
