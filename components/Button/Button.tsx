import React from "react";
import styles from "./Button.module.css";
import Spinner from "../Spinner/Spinner";

type ButtonProps = {
    onClick: () => void;
    isLoading: boolean;
    title: string;
    className?: string;
}

const Button = ({onClick, isLoading, title, className}: ButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>{isLoading ? <Spinner /> : <>{title}</>}</button>
  );
};

export default Button;
