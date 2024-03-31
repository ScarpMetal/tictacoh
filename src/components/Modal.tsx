import { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

export interface ModalProps {
  children: ReactNode | ReactNode[];
}

export const Modal = ({ children }: ModalProps) => {
  return createPortal(<div className="modal">{children}</div>, document.body);
};
