'use client';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

function CreateModal(props: IProps) {
    const { showModal, setShowModal } = props;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleCreateBlogs = () => {
        console.log('check', title, author, content);
        if (!title || !author || !content) {
            toast.error('Please fill in all fields!');
            return;
        }
        // Call API to create blog
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
                author: author,
            }), 
        })
        .then(response => {
            if (!response.ok){ 
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            toast.success('Create blog successfully!');
            ClearData();
            setShowModal(false);
            mutate('http://localhost:8000/blogs');
        })
        .catch((error) => {
            console.error('Error:', error);
            ClearData();
            setShowModal(false);
            toast.error('Create blog failed!');
        });
    }

    const ClearData = () => {
        setTitle('');
        setAuthor('');
        setContent('');
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" value={author} onChange={(event) => setAuthor(event.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" value={content} onChange={(event) => setContent(event.target.value)} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateBlogs()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateModal;