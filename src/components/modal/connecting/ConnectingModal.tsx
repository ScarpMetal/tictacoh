import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  clientSymbolAtom,
  gameStepAtom,
  opponentIdAtom,
  opponentSymbolAtom,
  roomAtom,
} from "~/atoms/gameAtoms";
import { Modal } from "~/components/modal/Modal";
import { selectableSymbolDisplays } from "~/config/symbolsConfig";
import { getGameRoom } from "~/utils/trysteroFunctions";
import "./ConnectingModal.scss";

export const ConnectingModal = () => {
  const gameStep = useAtomValue(gameStepAtom);
  const clientSymbol = useAtomValue(clientSymbolAtom);
  const setOpponentId = useSetAtom(opponentIdAtom);
  const setOpponentSymbol = useSetAtom(opponentSymbolAtom);
  const [room, setRoom] = useAtom(roomAtom);

  // Connect to game
  useEffect(() => {
    if (gameStep !== "connecting") return;
    if (room) return;

    async function attachGameToReactTree() {
      const room = await getGameRoom();
      setRoom(room);
    }
    attachGameToReactTree();
  }, [gameStep, room, setRoom]);

  // Get swap info with opponent
  useEffect(() => {
    if (gameStep !== "connecting") return;
    if (!room) return;

    const [sendSymbol, getSymbol] = room.makeAction("symbol");
    const peers = room.getPeers();

    // Send symbol if opponent is already here
    if (peers.length) {
      sendSymbol({ symbol: clientSymbol });
    }

    // Send symbol if opponent joins after client
    room.onPeerJoin((peerId) => {
      sendSymbol({ symbol: clientSymbol }, peerId);
    });

    // Get symbol data from opponent
    getSymbol((payload, peerId) => {
      const symbol = (payload as { symbol: string }).symbol;
      setOpponentId(peerId);
      setOpponentSymbol(symbol);
    });
  }, [clientSymbol, gameStep, room, setOpponentId, setOpponentSymbol]);

  if (gameStep !== "connecting") return null;
  if (!clientSymbol) return <i>please refresh the page</i>;

  return (
    <Modal>
      <div className="connecting-label">
        Connecting to opponent
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <div className="opponent-symbol-loading">
        {selectableSymbolDisplays.map((symbol, index) => (
          <div key={index}>{symbol}</div>
        ))}
      </div>
      <div className="vs">vs</div>
      <div className="player-selected-symbol">{clientSymbol}</div>
    </Modal>
  );
};
