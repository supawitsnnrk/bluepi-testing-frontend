import { useState } from "react";

type ModalType = "success" | "error" | "warning" | "info";

interface ModalState {
  isOpen: boolean;
  title?: string;
  message: string;
  type: ModalType;
}

export const useModal = () => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    message: "",
    type: "info",
  });

  const showModal = (
    message: string,
    type: ModalType = "info",
    title?: string,
  ) => {
    setModal({ isOpen: true, message, type, title });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return { modal, showModal, closeModal };
};
