import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'

function NotificationOffCanvas({ show, onHide }) {
  return (
    <Offcanvas show={show} onHide={onHide} className="bg-light ps-2">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h3 className="pt-2">Notifications</h3></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <h5 className="text-muted mt-2 fw-light"> You have no new notifications</h5>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default NotificationOffCanvas
