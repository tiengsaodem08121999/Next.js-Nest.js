import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import app from '@/styles/app.module.css';
import quy from '@/styles/quy.module.css'; 


export default function Home() {
  return (
    <>
      <ul>
        <li className={app['red']}>
          <Link href="/facebook">Facebook</Link>
        </li>
        <li>
          <Link href="/youtube"> <span className={quy['red']}> Youtube </span></Link>
        </li>
        <li>
          <Link href="/tiktok">Tiktok</Link>
        </li>
      </ul>
    </>
  )
}
