'use client'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import CreateModal from '../modal/create';
import { useState } from 'react';
import UpdateModal from '../modal/update';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
}

interface IProps {
  blogs: Blog[];
}

function TableComponent(props: IProps) {
  const { blogs } = props;
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);

  const handleShowUpdateBlog = (blog: Blog) => {
    setBlog(blog);
    setShowModalUpdate(true);
  }

  const handleDelete = (id: number) => {
    var confirmation = confirm(`Are you sure you want to delete your blog ${id} ?`);

    if (confirmation === true) {

      fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }).then(res => res.json())
        .then(res => {
          if (res) {
            toast.info('Delete Blog Sucsseed');
            mutate('http://localhost:8000/blogs');
          }
        });
    }
  }

return (
  <>
    <div className='mb-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h3>Table Blogs</h3>
      <Button variant='secondary' onClick={() => setShowModal(true)}>Add New</Button>
    </div>

    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td>
              <Link className='btn btn-primary' href={`/blogs/${item.id}`}>View</Link>
              <Button variant='warning' onClick={() => handleShowUpdateBlog(item)} className='mx-3'>Edit</Button>
              <Button variant='danger' onClick={() => handleDelete(item.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <CreateModal
      showModal={showModal}
      setShowModal={setShowModal}
    />
    <UpdateModal
      showModalUpdate={showModalUpdate}
      setShowModalUpdate={setShowModalUpdate}
      blog={blog}
      setBlog={setBlog}
    />
  </>
);
}

export default TableComponent;
