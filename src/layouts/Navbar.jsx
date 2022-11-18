import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useNavigate } from 'react-router-dom'

import { useMyUserState, useLogoutMutation } from '@/services/api/Auth'

function LayoutsNavbar() {
  const navigate = useNavigate()
  const { data: { id: currentUser } = {} } = useMyUserState()
  const [logout] = useLogoutMutation()

  const customLogout = () => logout().unwrap().then(() => {
    navigate('/')
  })

  return (

    currentUser ? (

      <Navbar bg="dark" expand="lg" variant="dark" className="px-3" sticky="top">
        <Container fluid>
          <Navbar.Brand className="fs-2">t  b  d</Navbar.Brand>
          <Form className="d-flex ms-4">
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
              className="ms-auto my-2 my-lg-0 gap-2 align-items-center"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/my/home">Home</Nav.Link>
              <Nav.Link href="/my/connections">Connections</Nav.Link>
              <Nav.Link href="/my/messages">Messages</Nav.Link>
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
                id="collapsible-nav-dropdown"
                variant="secondary"
                menuVariant="dark"
                align="end"
              >
                <NavDropdown.Item href="/my/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/my/settings">
                  Account Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={customLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    ) : (

      <div />

    )

  )
}

export default LayoutsNavbar
