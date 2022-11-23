import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useUpdateMyAccountSettingsMutation } from '@/services/api/Auth'

const initialValues = {
  email: '',
  fullName: '',
  password: '',
  passwordConfirmation: '',
  avatar: ''
}

function FormsAccountSettingsChangeModal(props) {
  const [avatarPreview, setAvatarPreview] = useState(props.initialValues.avatar)
  const avatarRef = useRef(null)

  const [update] = useUpdateMyAccountSettingsMutation()

  const handleSubmit = async (data) => {
    update(data).unwrap().then(() => {
    // console.log(data)
      props.onHide()
    })
  }

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Account Settings
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={
        Yup.object({
          email: Yup.string().label('Email'),
          fullName: Yup.string().label('Full name'),
          password: Yup.string().min(6).label('Password'),
          passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords need to match').label('Password confirmation'),
          avatar: Yup.mixed().label('Profile picture')
        })
      }
      >
        {
        ({ errors: e, touched: t, isSubmitting, setFieldValue }) => (
          <Form>
            <Modal.Body>

              <div className="mb-1 d-flex flex-row justify-content-start align-items-center">
                <label htmlFor="staticEmail" className="col-3 col-form-label">Current Email: </label>
                <div className="col">
                  <input type="text" readOnly className="form-control-plaintext text-muted" id="staticEmail" value={props.initialValues.email} />
                </div>
              </div>

              <div className="mb-3 d-flex flex-row justify-content-start align-items-center">
                <label className="col-3 fw-semibold">New Email:</label>
                <div className="col-6">
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
              </div>

              <div className="mb-1 d-flex flex-row justify-content-start align-items-center">
                <label htmlFor="staticName" className="col-sm-3 col-form-label">Current Full Name: </label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext text-muted" id="staticName" value={props.initialValues.fullName} />
                </div>
              </div>

              <div className="mb-3 d-flex flex-row justify-content-start align-items-center">
                <label className="col-3 fw-semibold">New Full Name:</label>
                <div className="col-6">
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
              </div>

              <div className="mb-3 d-flex flex-row justify-content-start align-items-center">
                <label className="col-3 fw-semibold">New Password:</label>
                <div className="col-6">
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
              </div>

              <div className="mb-3 d-flex flex-row justify-content-start align-items-center">
                <label className="col-3 fw-semibold">Confirm New Password:</label>
                <div className="col-6">
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
              </div>

              <div className="d-flex flex-row justify-content-start align-items-center mb-2">
                <div className="col-3">
                  <img
                    src={avatarPreview}
                    className="img-thumbnail rounded-5 ms-4"
                    width="100px"
                  />
                </div>

                <div className="col-6">
                  <div className="input-group input-group-sm mb-3">
                    <label className="input-group-text" htmlFor="avatar">Upload</label>
                    <input
                      ref={avatarRef}
                      id="avatar"
                      className={`form-control ${e?.avatar && 'is-invalid'}`}
                      name="avatar"
                      type="file"
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
                        setAvatarPreview(props.initialValues.avatar)
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
              <Button variant="outline-secondary" onClick={props.onHide}>
                Cancel
              </Button>
              <Button
                className="btn btn-dark"
                type="submit"
                disabled={isSubmitting}
              >Save Changes</Button>
            </Modal.Footer>
          </Form>
        )
      }
      </Formik>
    </Modal>
  )
}

export default FormsAccountSettingsChangeModal
