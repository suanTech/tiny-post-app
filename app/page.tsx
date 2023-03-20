"use client";
import axios from "axios";
import AddPost from "./components/AddPost";
import styles from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostType } from "@/app/types/Posts";

// Fetch all posts
const allPosts = async () => {
  const response = await axios.get("api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";
  return (
    <main className={styles.main}>
      <AddPost />
      {data?.map((post) => (
        <Post
          comments={post.comments}
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  );
}
