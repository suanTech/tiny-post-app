"use client";
import axios from "axios";
import AddPost from "./components/AddPost";
import styles from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostType } from "../types/Post";

const allPosts = async () => {
  const response = await axios.get("api/posts/getPosts");
  console.log(response.data)
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  return (
    <main className={styles.main}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
