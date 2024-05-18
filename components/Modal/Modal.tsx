import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

type ModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({ message, onConfirm, onCancel }: ModalProps) => {
  return (
    <>
      <div className={styles.main}>
        <h4>{message}</h4>
        <div className={styles.buttons}>
          <Button className={styles.cancelBtn} isLoading={false} title="Cancel" onClick={() => onCancel()} />
          <Button
          className={styles.confirmDeleteBtn}
            isLoading={false}
            title="Delete"
            onClick={() => onConfirm()}
          />
        </div>
      </div>

      <div className={styles.background}></div>
    </>
  );
};

export default Modal;
