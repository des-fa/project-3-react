import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import { NavLink, useNavigate } from 'react-router-dom'

import { useMyUserState, useLogoutMutation } from '@/services/api/Auth'

function LayoutsNavbar() {
  // const navigate = useNavigate()
  const { data: { user: currentUser } = {} } = useMyUserState()
  const [logout] = useLogoutMutation()

  // const customLogout = () => logout().unwrap().then(() => {
  //   navigate('/')
  // })

  return (

    currentUser ? (
      <div />
    ) : (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">t b d</Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 align-items-center"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Connections</Nav.Link>
              <Nav.Link href="#action2">Messages</Nav.Link>
              <NavDropdown
                title={(
                  <div className="pull-left">
                    <img
                      className="thumbnail-image rounded-circle"
                      width="50px"
                      src="https://i.pinimg.com/564x/1b/14/34/1b1434c7d78bca9e24bcb89e5126903c.jpg"
                      alt="user pic"
                    />
                  </div>
                  )}
                id="collasible-nav-dropdown"
                variant="secondary"
                menuVariant="dark"
                align="end"
              >
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Account Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )

  )
}

export default LayoutsNavbar
