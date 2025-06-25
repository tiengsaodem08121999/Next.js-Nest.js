'use client';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useSWR, {Fetcher} from 'swr';

const ViewDatailBlog = ({ params }: { params: { id: string } }) => {
    
    const fetcher :Fetcher<IBlogs, string> = (url: string) => fetch(url).then(res => res.json());

    const { data, error, isLoading } = useSWR(`http://localhost:8000/blogs/${params.id}`,
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
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Title: {data?.title}</Card.Title>
                    <Card.Text>
                        {data?.content}
                    </Card.Text>
                     <Card.Text>
                        {data?.author}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default ViewDatailBlog;