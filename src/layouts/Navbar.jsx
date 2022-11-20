import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useNavigate } from 'react-router-dom'

import { useMyUserState, useLogoutMutation } from '@/services/api/Auth'

import FormsSearch from '@/forms/Search'

function LayoutsNavbar() {
  const navigate = useNavigate()
  // DO I NEED TO SAVE QUERY AS STATE?!
  const { data: { id: currentUser, avatar } = {} } = useMyUserState()
  const [logout] = useLogoutMutation()

  const customLogout = () => logout().unwrap().then(() => {
    navigate('/')
  })

  return (

    currentUser ? (

      <Navbar bg="dark" expand="lg" variant="dark" className="px-3" sticky="top">
        <Container fluid>
          <Navbar.Brand className="fs-1 border rounded px-4 py-0">t  b  d</Navbar.Brand>

          <FormsSearch />

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 gap-2 align-items-center"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/my/home">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/my/connections">Connections</Nav.Link>
              <Nav.Link as={NavLink} to="/my/messages" className="me-2">Messages</Nav.Link>
              <NavDropdown
                title={(
                  <div className="pull-left">
                    <img
                      className="thumbnail-image border rounded-circle"
                      width="40px"
                      src={avatar}
                      alt="user pic"
                    />
                  </div>
                  )}
                id="collapsible-nav-dropdown"
                variant="secondary"
                menuVariant="dark"
                align="end"
              >
                <NavDropdown.Item className="mb-2" href="/my/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/my/account/settings">
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
