import { useAtomValue } from "jotai";
import { playerSymbolDisplayAtom } from "~/atoms/gameAtoms";
import { Modal } from "~/components/Modal";
import { selectableSymbolDisplays } from "~/config/symbolsConfig";
import "./ConnectingModal.scss";

export const ConnectingModal = () => {
  const playerSymbolDisplay = useAtomValue(playerSymbolDisplayAtom);
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
      <div className="player-selected-symbol">{playerSymbolDisplay}</div>
    </Modal>
  );
};
