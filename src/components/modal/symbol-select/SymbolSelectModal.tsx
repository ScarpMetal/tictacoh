import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { clientPlayerSymbolAtom, gameStepAtom } from "~/atoms/gameAtoms";
import { Modal } from "~/components/modal/Modal";
import { selectableSymbolDisplays } from "~/config/symbolsConfig";
import "./SymbolSelectModal.scss";

export const SymbolSelectModal = () => {
  const gameStep = useAtomValue(gameStepAtom);
  const setClientSymbol = useSetAtom(clientPlayerSymbolAtom);

  const handleSelectSymbol = useCallback(
    (symbol: string) => {
      setClientSymbol(symbol); // Sets player data in jotai store
    },
    [setClientSymbol]
  );

  if (gameStep !== "symbol-select") return null;

  return (
    <Modal>
      <div className="symbol-select-label">Select your symbol</div>
      <div className="symbol-select">
        {selectableSymbolDisplays.map((symbol, index) => (
          <button
            key={index}
            type="button"
            className="selectable-symbol"
            onClick={() => handleSelectSymbol(symbol)}
          >
            {symbol}
          </button>
        ))}
      </div>
    </Modal>
  );
};
