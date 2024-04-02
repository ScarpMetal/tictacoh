import { useDraggable } from "@dnd-kit/core";
import { CSS, Transform } from "@dnd-kit/utilities";
import { useAtomValue } from "jotai";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { symbolTurnAtom } from "~/atoms/gameAtoms";
import { SymbolDisplay } from "~/components/SymbolDisplay";
import { PieceType } from "~/types/gameTypes";
import "./Piece.scss";

export interface PieceProps {
  piece: PieceType;
  noDrag?: boolean;
}

export const Piece = ({ piece }: PieceProps) => {
  const symbolTurn = useAtomValue(symbolTurnAtom);
  const isDraggable = useMemo(
    () => piece.symbol === "X" && symbolTurn === piece.symbol,
    [piece, symbolTurn]
  );
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: piece.id,
    data: { piece },
    disabled: !isDraggable,
  });
  return (
    <MovablePieceDisplay
      ref={setNodeRef}
      transform={transform}
      piece={piece}
      data-is-draggable={isDraggable}
      {...listeners}
      {...attributes}
    />
  );
};

interface MovablePieceDisplayProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "className" | "style"
  > {
  piece: PieceType;
  transform?: Transform | null;
}

const MovablePieceDisplay = forwardRef(
  (
    { piece, transform = null, ...rest }: MovablePieceDisplayProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const style = { transform: CSS.Translate.toString(transform) };
    return (
      <div
        className="piece in-tray"
        ref={ref}
        data-level={piece.level}
        data-is-player={piece.symbol === "X"}
        style={style}
        {...rest}
      >
        <SymbolDisplay symbol={piece.symbol} />
      </div>
    );
  }
);
