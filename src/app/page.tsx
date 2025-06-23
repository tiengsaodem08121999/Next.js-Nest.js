'use client';
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import app from '@/styles/app.module.css';
import quy from '@/styles/quy.module.css'; 
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';

export default function Home() {
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/blogs');
      const data = await res.json();
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <>
    <Container>
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
      </Container>
    </>
  )
}
