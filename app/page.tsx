import Image from 'next/image'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>hello world!</h1>
    </main>
  )
}
