import React from 'react'
import { Modal } from 'react-bootstrap'

function ImageModal({ show, onHide, image }) {
  return (
    <Modal show={show} onHide={onHide} className="img-modal">
      <Modal.Body className="img-modal-content p-0">
        <img
          src={image}
          className=" w-100 h-100 text-center rounded"
          alt="post-picture"
        />
      </Modal.Body>
    </Modal>
  )
}

export default ImageModal
