"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import styles from "./AddComment.module.scss";
import Button from "./UI/Button";

type CommentProps = {
  message: string;
  postId?: string;
};
export default function AddComment({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commenttoastID = "comment";
  const { mutate } = useMutation(
    async (data: CommentProps) =>
      await axios.post("/api/posts/addComment", data),
    {
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commenttoastID });
        }
      },
      onSuccess: (data) => {
        setMessage("");
        setIsDisabled(false);
        toast.success("Comment successfully added!", { id: commenttoastID });
        queryClient.invalidateQueries(["detail-post"]);
      },
    }
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    commenttoastID = toast.loading("Adding your comment", {
      id: commenttoastID,
    });
    setIsDisabled(true);
    mutate({ message, postId: id });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add a comment</h3>
      <div className={styles.inputDiv}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          name="comment"
        />
      </div>
      <div className={styles.buttonDiv}>
        <Button className="add" disabled={isDisabled} type="submit">
          Add
        </Button>
        <p
          className={`styles.p ${message.length > 150 ? "warning" : ""}`}
        >{`${message.length}/150`}</p>
      </div>
    </form>
  );
}
