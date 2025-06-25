'use client';

import TableComponent from "@/components/table/table";
import useSWR from 'swr';

const BlogPage = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const { data, error, isLoading } = useSWR('http://localhost:8000/blogs',
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        });

    if (isLoading) {
        return <>Loading ...</>
    }

    return (
        <>
            <div className="container mt-3">
                <TableComponent blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
            </div>
        </>
    )
}

export default BlogPage;