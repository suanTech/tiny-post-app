"use client";

import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import styles from "./AddPost.module.scss";
import Button from "./UI/Button";


export default function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID = 'hello'

  // Create a post
  const { mutate } = useMutation(
    async (title:string) => await axios.post("api/posts/addPost", { title }),
    {
      onError: (error) => {
        if(error instanceof AxiosError) {
          toast.error(error?.response?.data.message, {id: toastPostID})
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Post has been made 🎊", {id: toastPostID})
        queryClient.invalidateQueries(['posts'])
        setTitle("");
        setIsDisabled(false)
      }
    }
  )

  const submitPost = async (e:React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", {id: toastPostID})
    setIsDisabled(true)
    mutate(title)
  }
  return (
    <form onSubmit={submitPost} className={styles.form}>
      <div className={styles.textDiv}>
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className={styles.textarea}
        ></textarea>
      </div>
      <div className={styles.buttonDiv}>
        <p
          className={`styles.p ${title.length > 300 ? 'warning' : ''}`}
        >{`${title.length}/300`}</p>
        <Button type="submit" className="add" disabled={isDisabled}>
          Create a post
        </Button>
      </div>
    </form>
  );
}
