"use client";
import AddComment from "@/app/components/AddComment";
import Comment from "@/app/components/Comment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type URL = {
  params: {
    slug: string;
  };
};

const fetchPostDetail = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchPostDetail(url.params.slug),
  });
  if (isLoading) return "Loading...";
  return (
    <div>
      <Post
        id={data?.id || ""}
        postTitle={data?.title || ""}
        avatar={data?.user.image || ""}
        name={data?.user.name || ""}
        comments={data?.comments}
      />
      <AddComment id={data?.id || ""}/>
      <h3>Comments</h3>
      {data?.comments.map(comment => (
        <Comment 
          id={comment.id}
          key={comment.id}
          message={comment.message}
          user={comment.user.name}
          time={comment.createdAt}
        />
      ))}
    </div>
  );
}
