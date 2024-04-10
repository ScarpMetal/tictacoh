import { get, query, ref } from "firebase/database";
import { joinRoom } from "trystero/firebase";
import { app, rtdb } from "~/config/firebase";

export async function getGameRoom() {
  const availableRoom = await joinAvailableRoom();
  if (availableRoom) {
    return availableRoom;
  }
  const randomRoomId = crypto.randomUUID();
  return joinRoom(
    {
      appId: "https://tictacoh-ba708-default-rtdb.firebaseio.com",
      firebaseApp: app,
    },
    randomRoomId
  );
}

// Find available rooms
export async function joinAvailableRoom() {
  // Get current list of room ids from firebase
  const snapshot = await get(query(ref(rtdb, "__trystero__")));
  const roomsObj = snapshot.val() as {
    [roomId: string]: { [playerId: string]: boolean };
  };
  let availableRoomId: string | null = null;
  // Search for a room with only one player
  for (const roomId in roomsObj) {
    const room = roomsObj[roomId];
    const playersInRoom = Object.keys(room).length;
    if (playersInRoom === 1) {
      availableRoomId = roomId;
      break;
    }
  }

  if (!availableRoomId) return null;

  return joinRoom(
    {
      appId: "https://tictacoh-ba708-default-rtdb.firebaseio.com",
      firebaseApp: app,
    },
    availableRoomId
  );
}
