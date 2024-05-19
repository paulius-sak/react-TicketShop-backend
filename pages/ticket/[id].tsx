import React, { useState, useEffect } from "react";
import styles from "./ticket.module.css";
import cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { TicketType } from "../../types/ticket";
import Image from "next/image";
import heart from "../../assets/heart.svg";
import heartRed from "../../assets/heartRed.svg";
import Modal from "@/components/Modal/Modal";
import PageTemplate from "@/components/PageTemplate/PageTemplate";



const Ticket = () => {
  const [ticket, setTicket] = useState<TicketType | null>(null);
  const [isShowWarning, setShowWarning] = useState(false);

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
    router.query && fetchTicket();
  }, [router]);

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
      router.push("/");
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
    <PageTemplate>
    <main>
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
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus praesentium magni dolorem repellat mollitia ut voluptatem accusamus ab nam a. Nemo sed id eius repellat reprehenderit, accusamus quidem non illo.</p>
          <button onClick={favorite}>
            <Image
              className={styles.favoritesBtn}
              src={isFavorite ? heartRed : heart}
              alt="favorites"
            />
          </button>
          <button onClick={() => setShowWarning(true)} className={styles.deleteBtn}>
            Delete
          </button>
        </div>
      </div>

      {isShowWarning && (
        <Modal
          message="Do you really want to delete this ticket?"
          onConfirm={deleteFetchTicket}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </main>
    </PageTemplate>
  );
};

export default Ticket;
