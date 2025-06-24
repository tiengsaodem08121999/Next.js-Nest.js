'use client';
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import app from '@/styles/app.module.css';
import quy from '@/styles/quy.module.css';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import useSWR from 'swr';
import TableComponent from '@/components/table/table';

export default function Home() {

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, error, isLoading } = useSWR('http://localhost:8000/blogs',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  if (!data) {
    return (
      <>
        Loading ...
      </>)
  }
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
        <div>
          <TableComponent blogs={data} />
        </div>
      </Container>
    </>
  )
}
