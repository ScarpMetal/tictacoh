import { useAtomValue } from "jotai";
import {
  opponentSymbolDisplayAtom,
  playerSymbolDisplayAtom,
} from "~/atoms/gameAtoms";
import { PieceSymbol } from "~/types/gameTypes";
import "./SymbolDisplay.scss";

export interface SymbolDisplayProps {
  symbol: PieceSymbol;
}

export const SymbolDisplay = ({ symbol }: SymbolDisplayProps) => {
  const playerSymbolDisplay = useAtomValue(playerSymbolDisplayAtom);
  const opponentSymbolDisplay = useAtomValue(opponentSymbolDisplayAtom);
  const invert =
    symbol === "O" && playerSymbolDisplay === opponentSymbolDisplay;
  return (
    <div className="symbol-display" data-invert={invert}>
      {symbol === "X" ? playerSymbolDisplay : opponentSymbolDisplay}
    </div>
  );
};
