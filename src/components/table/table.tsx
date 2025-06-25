'use client'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import CreateModal from '../modal/create';
import { useState } from 'react';
import UpdateModal from '../modal/update';

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
  const [showModalUpdate, setShowModalUpdate ] = useState(false);
  const [blog, setBlog] = useState<Blog| null>(null);

  const handleShowUpdateBlog = (blog: Blog) => {
      setBlog(blog);
      setShowModalUpdate(true);
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
                <Button>View</Button>
                <Button variant='warning' onClick={() => handleShowUpdateBlog(item)} className='mx-3'>Edit</Button>
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
      <UpdateModal
        showModalUpdate= {showModalUpdate}
        setShowModalUpdate = {setShowModalUpdate}
        blog = {blog}
        setBlog= {setBlog}
      />
    </>
  );
}

export default TableComponent;
