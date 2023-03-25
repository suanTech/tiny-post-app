import styles from "./Comment.module.scss";
import Container from "./UI/Container";

type CommentProps = {
  user: string;
  id: string;
  message: string;
  time: string;
};

export default function Comment({ user, message, time }: CommentProps) {
  return (
    <Container>
      <div className={styles.div}>
        <h3>{user}</h3>
        <p>{time}</p>
      </div>
      <div className={styles.commentDiv}>
        <h3>{message}</h3>
      </div>
    </Container>
  );
}
