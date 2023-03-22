"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "../components/Post.module.scss";
import Button from "../components/UI/Button";
import Modal from "./Modal";
type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  // Toggle
  const [toggle, setToggle] = useState(false);
  // Delete Post
  let deleteToastID = 'delete';
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        toast.error("Error deleting the post", {id: deleteToastID})
      },
      onSuccess: (data) => {
        toast.success("Post deleted!", {id: deleteToastID})
        queryClient.invalidateQueries(["user-posts"]);
      },
    }
  );
  const deletePost = () => {
    deleteToastID = toast.loading("Deleting your post...", {id: deleteToastID})
    mutate(id);
  };
  return (
    <>
      <div className={styles.wrapperDiv}>
        <div className={styles.authorDiv}>
          <Image
            className="round avatar.small"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <p>{name}</p>
        </div>
        <div className={styles.postDiv}>
          <p>{title}</p>
        </div>
        <div className={styles.commentDiv}>
          <p>{comments!.length} Comments</p>
          <Button className="delete warning" onClick={() => setToggle(!toggle)}>
            Delete
          </Button>
        </div>
      </div>
      {toggle && <Modal deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
