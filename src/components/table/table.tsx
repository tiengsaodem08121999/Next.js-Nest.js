'use client'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import CreateModal from '../modal/create';
import { useState } from 'react';

interface Blog {
  id: number;
  title: string;
  author: string;
}

interface IProps {
  blogs: Blog[];
}

function TableComponent(props: IProps) {
  const { blogs } = props;
  const [showModal, setShowModal] = useState(false);
  
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
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>
                <Button>View</Button>
                <Button variant='warning' className='mx-3'>Edit</Button>
                <Button variant='danger'>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CreateModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default TableComponent;
