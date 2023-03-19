"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "../components/UI/Button";
import StyledImage from "../components/UI/Image";

type UserProps = {
  image: string | null | undefined;
};

export default function Logged({ image }: UserProps) {
  return (
    <li>
      <Button onClick={() => signOut()} className="primary">
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
