import { useAtomValue } from "jotai";
import { clientSymbolAtom, opponentSymbolAtom } from "~/atoms/gameAtoms";
import { PieceLetter } from "~/types/gameTypes";
import "./SymbolDisplay.scss";

export interface SymbolDisplayProps {
  letter: PieceLetter;
}

export const SymbolDisplay = ({ letter }: SymbolDisplayProps) => {
  const clientSymbol = useAtomValue(clientSymbolAtom);
  const opponentSymbol = useAtomValue(opponentSymbolAtom);
  const invert = letter === "O" && clientSymbol === opponentSymbol;
  let symbol = "❓";
  if (letter === "C" && clientSymbol) {
    symbol = clientSymbol;
  } else if (letter === "O" && opponentSymbol) {
    symbol = opponentSymbol;
  }

  return (
    <div className="symbol-display" data-invert={invert}>
      {symbol}
    </div>
  );
};
