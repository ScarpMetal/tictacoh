import { useSetAtom } from "jotai";
import { playerSymbolDisplayAtom } from "~/atoms/gameAtoms";
import { Modal } from "~/components/Modal";
import { selectableSymbolDisplays } from "~/config/symbolsConfig";
import "./SymbolSelectModal.scss";

export const SymbolSelectModal = () => {
  const setPlayerSymbolDisplay = useSetAtom(playerSymbolDisplayAtom);

  return (
    <Modal>
      <div className="symbol-select-label">Select your symbol</div>
      <div className="symbol-select">
        {selectableSymbolDisplays.map((symbol, index) => (
          <button
            key={index}
            type="button"
            className="selectable-symbol"
            onClick={() => setPlayerSymbolDisplay(symbol)}
          >
            {symbol}
          </button>
        ))}
      </div>
    </Modal>
  );
};
