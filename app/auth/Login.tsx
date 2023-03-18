"use client";

import { signIn } from "next-auth/react";
import styles from "./Login.module.scss";

export default function Login() {
  return (
    <li>
      <button onClick={() => signIn()} className={styles.button}>
        Sign In
      </button>
    </li>
  );
}
