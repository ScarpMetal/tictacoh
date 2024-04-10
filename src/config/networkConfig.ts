import { Peer } from "peerjs";

export const matchmakingHostId = "tic-tac-oh-matchmaking-host";
const connectToMatchmakingHostTimeout = 5000; // 5 seconds

function becomeMatchmakingHost() {
  const matchmakingPeer = new Peer(matchmakingHostId);
  matchmakingPeer.on("connection", function (conn) {
    console.log("Found connection with id: ", conn.connectionId);
  });
}

type MatchmakingHostDataPacket = {
  type: "connect-to-me";
  peerId: string;
};

// function tryToConnectToMatchmakingHost() {
//   const peer = new Peer();
//   const matchMakingHostConn = peer.connect(matchmakingHostId);
//   let foundMatchmakingHost = false;

//   const connectingTimeout = setTimeout(() => {
//     peer.destroy();
//     becomeMatchmakingHost();
//   }, connectToMatchmakingHostTimeout);

//   matchMakingHostConn.on("open", () => {
//     console.log("successfully opened connection with matchmaking host");
//     foundMatchmakingHost = true;
//     clearTimeout(connectingTimeout);
//   });

//   matchMakingHostConn.on("data", (data: MatchmakingHostDataPacket) => {
//     switch (data.type) {
//       case "connect-to-me":
//         peer.connect();
//         break;
//       default:
//         console.log("Unknown MatchmakingHostDataPacket type: ", data.type);
//         break;
//     }
//   });

//   peer.on("connection", () => {
//     // matchmaking host connected to me
//   });
// }

// const useCreateConnection = () => {
//   const playerPeerId = useAtomValue(playerPeerIdAtom);
//   const peer = useMemo(() => new Peer(playerPeerId), [playerPeerId]);
// };

// const useConnectedPeer = () => {
//   const playerPeerId = useAtomValue(playerPeerIdAtom);
//   const peer = useMemo(() => new Peer(playerPeerId), [playerPeerId]);

//   return peer;
// };
