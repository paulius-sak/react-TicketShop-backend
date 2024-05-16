import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { links, logo } from "../../constans/links";
import { useRouter } from "next/router";
import styles from "./addTicket.module.css";
import axios from "axios";
import cookies from "js-cookie";
import Button from "../../components/Button/Button";

const AddTicket = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [toLocationPhotoUrl, setToLocationPhotoUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

  const addTicket = async () => {
    try {
      const newTicket = {
        title: title,
        price: price,
        fromLocation: fromLocation,
        toLocation: toLocation,
        toLocationPhotoUrl: toLocationPhotoUrl,
      };

      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/tickets`,
        newTicket,
        {
          headers,
        }
      );

      console.log(response);

      if (response.status === 201) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isAllFieldsValid =
    title && price && fromLocation && toLocation && toLocationPhotoUrl;

  return (
    <div>
      <Header logo={logo} links={links} />
      <div className={styles.formWrapper}>
        <h1>Add Ticket</h1>
        <div className={styles.form}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            placeholder="From"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
          />

          <input
            placeholder="To"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
          />

          <input
            placeholder="Destination Photo URL"
            value={toLocationPhotoUrl}
            onChange={(e) => setToLocationPhotoUrl(e.target.value)}
          />

          <Button
            className={`${isAllFieldsValid ? styles.validBtn : styles.invalidBtn}`}
            isLoading={isLoading}
            title="Add Ticket"
            onClick={addTicket}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
