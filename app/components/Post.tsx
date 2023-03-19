'use client'
import Image from "next/image"
import Link from "next/link"
import styles from './Post.module.scss'

export default function Post({avatar, name, postTitle, id}) {
  return (
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
        <p>{postTitle}</p>
      </div>
      <div className={styles.commentDiv}>
        <Link href={`/post/${id}`}>
          <p>Comments</p>
        </Link>
      </div>
    </div>
  )
}

