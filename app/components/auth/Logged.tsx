"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "../UI/Button";
import StyledImage from "../UI/Image";

type UserProps = {
  image: string | null | undefined;
};

export default function Logged({ image }: UserProps) {
  return (
    <li>
      <Button onClick={() => signOut()} className="login">
        Sign out
      </Button>
      <Link href="/dashboard">
        <StyledImage
          className="round avatar"
          width={64}
          height={64}
          src={image || ""}
          alt="user's image"
        ></StyledImage>
      </Link>
    </li>
  );
}
