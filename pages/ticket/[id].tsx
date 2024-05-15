import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { links, logo } from "../../constans/links";
import styles from "../../styles/Home.module.css";
import cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { TicketType } from "../../types/ticket";
import Image from "next/image";
import heart from "../../assets/heart.svg";
import heartRed from "../../assets/heartRed.svg";

const Ticket = () => {
  const [ticket, setTicket] = useState<TicketType | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const fetchTicket = async () => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.get(
        `${process.env.SERVER_URL}/tickets/${id}`,
        {
          headers,
        }
      );
      setTicket(response.data.ticket);
      console.log(response.data.ticket);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        router.push("/login");
      }
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const [isFavorite, setFavorite] = useState(false);

  const favorite = () => {
    setFavorite(!isFavorite);
  };

  const deleteFetchTicket = async () => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.delete(
        `${process.env.SERVER_URL}/tickets/${id}`,
        {
          headers,
        }
      );
      router.push("/")
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        router.push("/login");
      } else if (axiosError.response?.status === 401) {
        router.push("/");
      }
      console.log("err", err);
    }
  };

  return (
    <div >
      <Header logo={logo} links={links} />
      <div className={styles.wrapper}>
        <img
          className={styles.locationPhoto}
          src={ticket?.toLocationPhotoUrl}
          alt=""
        />
        <div className={styles.infoWrapper}>
          <h2>{ticket?.title}</h2>
          <h3>{ticket?.price}$</h3>
          <h4>From: {ticket?.fromLocation}</h4>
          <h4>To: {ticket?.toLocation}</h4>
          <button onClick={favorite}>
            <Image
              className={styles.favoritesBtn}
              src={isFavorite ? heartRed : heart}
              alt="favorites"
            />
          </button>
          <button onClick={deleteFetchTicket} className={styles.deleteBtn}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
