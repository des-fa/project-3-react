import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useSignupMutation } from '@/services/api/Auth'
import defaultAvatar from '../../assets/defaultAvatar.png'

const initialValues = {
  email: '',
  fullName: '',
  password: '',
  passwordConfirmation: '',
  avatar: ''
}

function FormsAuthSignupModal(props) {
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar)
  const avatarRef = useRef(null)
  const navigate = useNavigate()
  const [signup] = useSignupMutation()

  const customSignup = (data) => {
    signup(data).unwrap().then(() => {
      navigate('/my/profile')
    })
  }

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        onClick={() => {
          props.onHide()
          setAvatarPreview(defaultAvatar)
          avatarRef.current.value = null
        }}
      >
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
        ({ errors: e, touched: t, isValidating, setFieldValue }) => (
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

              <div className="d-flex flex-row justify-content-evenly align-items-center mb-2">
                <div className="col-3 h-100">
                  <img
                    src={avatarPreview}
                    className="img-thumbnail rounded-4 me-0"
                    width="100px"
                    height="auto"
                  />
                </div>

                <div className="col-9">
                  <div className="input-group input-group-sm mb-3">
                    <label className="input-group-text" htmlFor="avatar">Upload</label>
                    <input
                      ref={avatarRef}
                      id="avatar"
                      className={`form-control ${e?.avatar && 'is-invalid'}`}
                      name="avatar"
                      type="file"
                  // onChange={(event) => {
                  //   setFieldValue('avatar', event.currentTarget.files[0])
                  //   setAvatarPreview(values.avatar)
                  // }}
                      onChange={(event) => {
                        const fileReader = new FileReader()
                        fileReader.onload = () => {
                          if (fileReader.readyState === 2) {
                            setFieldValue('avatar', fileReader.result)
                            setAvatarPreview(fileReader.result)
                          }
                        }
                        fileReader.readAsDataURL(event.target.files[0])
                      }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => {
                        setAvatarPreview(defaultAvatar)
                        setFieldValue('avatar', '')
                        avatarRef.current.value = null
                      }}
                    >X</button>

                    <ErrorMessage
                      className="invalid-feedback"
                      name="avatar"
                      component="div"
                    />
                  </div>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-dark"
                type="submit"
                disabled={isValidating}
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
