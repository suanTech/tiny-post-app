import Link from "next/link";
import Login from "./auth/Login";
import Logged from "./auth/Logged";
import { getServerSession } from "next-auth";
import styles from './Nav.module.scss'
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <nav className={styles.nav}>
      <Link href="/"> 
        <h1>Tiny post.</h1>
      </Link>
      <ul>
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image}/>}
      </ul>
    </nav>
  );
}
