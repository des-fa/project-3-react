import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useSignupMutation } from '@/services/api/Auth'

const initialValues = {
  email: '',
  fullName: '',
  password: '',
  passwordConfirmation: '',
  avatar: ''
}

function FormsAuthSignupModal(props) {
  const navigate = useNavigate()
  const [signup] = useSignupMutation()

  const customSignup = (data) => signup(data).unwrap().then(() => {
    navigate('/my/profile')
  })

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="shadow"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign up for free
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={props.initialValues || initialValues}
        onSubmit={customSignup}
        enableReinitialize
        validationSchema={
        Yup.object({
          email: Yup.string().required().label('Email'),
          fullName: Yup.string().required().label('Full name'),
          password: Yup.string().min(6).required().label('Password'),
          passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords need to match').required().label('Password confirmation'),
          avatar: Yup.mixed().required().label('Profile picture')
        })
      }
      >
        {
        ({ errors: e, touched: t, isSubmitting, setFieldValue }) => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <label>Email</label>
                <Field
                  className={`form-control ${e?.email && t?.email && 'is-invalid'}`}
                  name="email"
                  type="email"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="email"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Full Name</label>
                <Field
                  className={`form-control ${e?.fullName && t?.fullName && 'is-invalid'}`}
                  name="fullName"
                  type="text"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="fullName"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <Field
                  className={`form-control ${e?.password && t?.password && 'is-invalid'}`}
                  name="password"
                  type="password"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="password"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Password Confirmation</label>
                <Field
                  className={`form-control ${e?.passwordConfirmation && t?.passwordConfirmation && 'is-invalid'}`}
                  name="passwordConfirmation"
                  type="password"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="passwordConfirmation"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Profile Picture</label>
                <input
                  type="file"
                  name="avatar"
                  onChange={(event) => {
                    setFieldValue('avatar', event.currentTarget.files[0])
                  }}
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="avatar"
                  component="div"
                />
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-dark"
                type="submit"
                disabled={isSubmitting}
              >Sign Up</Button>
            </Modal.Footer>
          </Form>
        )
      }
      </Formik>
    </Modal>
  )
}

export default FormsAuthSignupModal
