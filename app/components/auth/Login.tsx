"use client";

import { signIn } from "next-auth/react";
import Button from "../UI/Button";

export default function Login() {
  return (
    <li>
      <Button onClick={() => signIn()} className='primary'>
        Sign In
      </Button>
    </li>
  );
}
