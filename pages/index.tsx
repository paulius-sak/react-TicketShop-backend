import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { links, logo } from "../constans/links";
import CardsWrapper from "../components/CardsWrapper/CardsWrapper";
import { TicketType } from "../types/ticket";
import cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

const Index = () => {
  const [tickets, setTickets] = useState<TicketType[] | null>(null);

  const router = useRouter();

  const fetchTickets = async () => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };
      const response = await axios.get(`${process.env.SERVER_URL}/tickets`, {
        headers,
      });
      setTickets(response.data.tickets);
      console.log(response.data.tickets);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        router.push("/login");
      }
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <PageTemplate>
      {tickets && <CardsWrapper tickets={tickets} />}
    </PageTemplate>
  );
};

export default Index;
