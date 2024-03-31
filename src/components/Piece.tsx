import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SymbolDisplay } from "~/components/SymbolDisplay";
import { PieceType } from "~/types/gameTypes";
import "./Piece.scss";

export interface PieceProps {
  piece: PieceType;
}

export const Piece = ({ piece }: PieceProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: piece.id,
    data: { piece },
  });
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div
      className="piece in-tray"
      ref={setNodeRef}
      data-level={piece.level}
      style={style}
      {...listeners}
      {...attributes}
    >
      <SymbolDisplay symbol={piece.symbol} />
    </div>
  );
};
