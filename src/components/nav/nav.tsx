'use client';
import Link from 'next/link'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Container>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Link href="/" className='nav-link'> Home</Link>
        </Nav.Item>
        <Nav.Item>
           <Link href="/blogs" className='nav-link'>Blogs</Link>
        </Nav.Item>
      <NavDropdown title="Dropdown" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Container>
  );
}

export default NavBar;