"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

import commonStyles from "../components/Post.module.scss";
import styles from "./EditPost.module.scss";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
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
type Data = {
  postId: string;
  title: string;
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const [toggle, setToggle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  let deleteToastID = "delete";
  let editToastId = "edit";
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        toast.error("Error deleting the post", { id: deleteToastID });
      },
      onSuccess: (data) => {
        toast.success("Post deleted!", { id: deleteToastID });
        queryClient.invalidateQueries(["user-posts"]);
      },
    }
  );
  const editMutation = useMutation(
    async (data: Data) => await axios.put("/api/posts/editPost", data),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: editToastId });
        }
      },
      onSuccess: (data) => {
        toast.success("Post edited!", { id: editToastId });
        queryClient.invalidateQueries(["user-posts"]);
        setIsEditing(false);
      },
    }
  );
  const deletePost = () => {
    deleteToastID = toast.loading("Deleting your post...", {
      id: deleteToastID,
    });
    deleteMutation.mutate(id);
  };
  const editPost = () => {
    editToastId = toast.loading("Editing your post...", { id: editToastId });
    editMutation.mutate({ postId: id, title: newTitle });
  };
  return (
    <>
      <Container>
        <div className={commonStyles.authorDiv}>
          <Image
            className="round avatar.small"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <p>{name}</p>
        </div>
        <div className={commonStyles.postDiv}>
          {isEditing ? (
            <>
              <textarea
                className={styles.textarea}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <p
                className={`${newTitle.length > 300 ? "warning" : ""}`}
              >{`${newTitle.length}/300`}</p>
            </>
          ) : (
            <p>{newTitle ? newTitle : title}</p>
          )}
        </div>
        <div className={commonStyles.commentDiv}>
          <p>{comments!.length} Comments</p>
          {!isEditing ? (
            <Button className="edit" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <Button className="edit" onClick={editPost}>
              Save
            </Button>
          )}
          <Button className="warning" onClick={() => setToggle(!toggle)}>
            Delete
          </Button>
        </div>
      </Container>
      {toggle && <Modal deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
