"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserPosts } from "../types/UserPosts";
import EditPost from "./EditPost";

const fetchUserPosts = async () => {
  const response = await axios.get("api/posts/userPosts");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<UserPosts>({
    queryFn: fetchUserPosts,
    queryKey: ["user-posts"],
  });
  if(isLoading) return <p>Posts are loading...</p>
  return (
    <div>
      {data?.posts?.map((post) => (
      <EditPost 
        id={post.id}
        key={post.id}
        avatar={data.image}
        name={data.name}
        title={post.title}
        comments={post.comments}
      />))}
    </div>
  );
}
