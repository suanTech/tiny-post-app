import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";
import styles from './page.module.scss';
import { Metadata } from "next";

export async function generateMetadata (): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  return {title: `${session?.user?.name}'s dashboard`}
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if(!session) {
    redirect('/api/auth/signin')
  }
  return (
    <main className={styles.main}>
      <h3 className={styles.h3}>Welcome back! {session.user?.name}</h3>
      <MyPosts/>
    </main>
  )
}
