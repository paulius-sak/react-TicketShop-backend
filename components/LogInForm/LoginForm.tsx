import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import Button from "../Button/Button";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isBadData, setBadData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const loginBody = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      setError(true);
      return;
    }
    setError(false);

    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/users/login`,
        loginBody
      );

      if (response.status === 200) {
        setBadData(false);
        cookies.set("jwt_token", response.data.jwt);
        router.push("/");
      }
      setLoading(false);

      console.log("response", response);
    } catch (err) {
      setBadData(true);
      console.log("err", err);
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>LOGIN</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email..."
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password..."
      />
      <Button isLoading={isLoading} onClick={onLogin} title="Login" />

      {isError && (
        <div className={styles.error}>Please fill all the inputs</div>
      )}

      {isBadData && (
        <div className={styles.error}>Your provided data is bad</div>
      )}
    </div>
  );
};

export default LoginForm;

// {
//     "name": "Tomas",
//     "email": "tomas5@gmail.com",
//     "password" : "password1"
//   }
