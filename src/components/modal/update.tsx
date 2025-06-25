'use client';

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface Blog {
    id: number;
    title: string;
    author: string;
    content: string;
}

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    blog: Blog | null;
    setBlog: React.Dispatch<React.SetStateAction<Blog | null>>;
}

function UpdateModal(props: IProps) {
    const { blog, setBlog, showModalUpdate, setShowModalUpdate } = props;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (blog) {
            setId(blog.id);
            setTitle(blog.title);
            setAuthor(blog.author);
            setContent(blog.content);
        }
    }, [blog]);

    const handleUpdateBlogs = () => {
        if(!title || !author || !content) {
            toast.error('Please fill in all fields!');
            return;
        }

        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
             headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
              body: JSON.stringify({
                title: title,
                content: content,
                author: author,
            }), 
        }).then(res=> res.json())
            .then(res => {
                if(res) {
                    toast.info('Update Blog Sucsseed');
                    setShowModalUpdate(false);
                    mutate('http://localhost:8000/blogs');
                }
            });
    }

    return (
        <>
            <Modal
                show={showModalUpdate}
                onHide={() => setShowModalUpdate(false)}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" value={content} onChange={(event) => setContent(event.target.value)} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalUpdate(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateBlogs()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal;