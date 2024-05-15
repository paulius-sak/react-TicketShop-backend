import React, { useState } from "react";
import styles from "./Card.module.css";
import heart from "../../assets/heart.svg";
import heartRed from "../../assets/heartRed.svg";
import Image from "next/image";
import Link from "next/link";

export type CardProps = {
  id: string;
  title: string;
  price: number;
  fromLocation: string;
  toLocation: string;
  toLocationPhotoUrl: string;
};

const Card = ({
  id,
  title,
  price,
  fromLocation,
  toLocation,
  toLocationPhotoUrl,
}: CardProps) => {
  const [isFavorite, setFavorite] = useState(false);

  const favorite = () => {
    setFavorite(!isFavorite);
  };

  return (
    <div className={styles.wrapper}>
      <Link href={`/ticket/${id}`} >
        <img className={styles.locationPhoto} src={toLocationPhotoUrl} alt="" />

        <div className={styles.infoWrapper}>
          <h2>{title}</h2>
          <h3>{price}$</h3>
          <h4>From: {fromLocation}</h4>
          <h4>To: {toLocation}</h4>
        </div>
      </Link>
        <button onClick={favorite}>
          <Image
            className={styles.favoritesBtn}
            src={isFavorite ? heartRed : heart}
            alt="favorites"
          />
        </button>
    </div>
  );
};

export default Card;
