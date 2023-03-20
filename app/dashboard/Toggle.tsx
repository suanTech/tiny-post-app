import Button from '../components/UI/Button';
import styles from './Toggle.module.scss';

type ToggleProps = {
  deletePost: () => void
  setToggle: (toggle: boolean) => void
}
export default function Toggle({deletePost, setToggle}: ToggleProps) {
  const handleDelete = () => {
    deletePost();
    setToggle(false);
  }
  
  return (
    <div className={styles.containerDiv}>
      <div className={styles.modalDiv}>
        <span className={styles.span}><Button onClick={() => setToggle(false)}>x</Button></span>
        <h3>
          Are you sure you want to delete this post? 🤔
        </h3>
        <p className='small warning'>
          <i>**This action cannot be undone</i>
        </p>
        <Button className="confirm" onClick={handleDelete}> Delete Post</Button>
      </div>
    </div>
  );
}
