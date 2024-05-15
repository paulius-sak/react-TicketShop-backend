import { TicketType } from "../../types/ticket";
import React from "react";
import styles from "./CardsWrapper.module.css";
import Card from "../Card/Card";

type CardsWrapper = {
  tickets: TicketType[];
};

const CardsWrapper = ({ tickets }: CardsWrapper) => {
  return (
    <div className={styles.cardsWrapper}>
      {tickets.map((ticket) => (
        <Card
          id={ticket.ticketId}
          key={ticket.ticketId}
          title={ticket.title}
          price={ticket.price}
          fromLocation={ticket.fromLocation}
          toLocation={ticket.toLocation}
          toLocationPhotoUrl={ticket.toLocationPhotoUrl}
        />
      ))}
    </div>
  );
};

export default CardsWrapper;
