import styles from "./Comment.module.scss";

type CommentProps = {
  user: string;
  id: string;
  message: string;
  time: string;
};

export default function Comment({ user, message, time }: CommentProps) {
  return (
    <div className={styles.wrapperDiv}>
      <div className={styles.div}>
        <h3>{user}</h3>
        <p>{time}</p>
      </div>
      <div>
        <h3>{message}</h3>
      </div>
    </div>
  );
}
