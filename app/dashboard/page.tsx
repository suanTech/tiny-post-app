import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";
import styles from './page.module.scss';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if(!session) {
    redirect('/api/auth/signin')
  }
  return (
    <main>
      <h2 className={styles.h2}>Welcome back! {session.user?.name}</h2>
      <MyPosts/>
    </main>
  )
}
