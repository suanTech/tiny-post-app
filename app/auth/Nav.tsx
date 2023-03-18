import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import styles from './Nav.module.scss'

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <nav className={styles.nav}>
      <Link href="/"> 
        <h1>Send it.</h1>
      </Link>
      <ul>
        <Login />
      </ul>
    </nav>
  );
}
