import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useUpdateMyProfileMutation, useCreateMyProfileMutation } from '@/services/api/my/MyProfile'

const initialValues = {
  currentJob: '',
  highestEducation: '',
  about: ''
}

function FormsProfileChangeModal(props) {
  const navigate = useNavigate()
  const [createMyProfile] = useCreateMyProfileMutation()
  const [updateMyProfile] = useUpdateMyProfileMutation()

  const handleSubmit = props.initialValues ? (
    async (values) => {
      await updateMyProfile(values)
        .then(() => {
          props.setEditModalShow(false)
          navigate('/my/profile')
        })
    }
  ) : (
    async (values) => {
      await createMyProfile(values).unwrap().then(() => {
        // console.log(values)
        navigate('/my/profile')
      })
    }
  )

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter your profile information
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={props.initialValues || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={
        Yup.object({
          currentJob: Yup.string().required().trim().label('Current job/job status'),
          highestEducation: Yup.string().trim().required().label('Institution of highest level of education'),
          about: Yup
            .string()
            .trim()
            .max(400, 'Maximum 400 characters.')
            .required()
            .label('About me')
        })
      }
      >
        {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <label>Current employment/employment status</label>
                <Field
                  className={`form-control ${e?.currentJob && t?.currentJob && 'is-invalid'}`}
                  name="currentJob"
                  placeholder="What is your current job or job status?"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="currentJob"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Institution of highest level of education</label>
                <Field
                  className={`form-control ${e?.highestEducation && t?.highestEducation && 'is-invalid'}`}
                  name="highestEducation"
                  placeholder="Where did you get your highest level of education?"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="highestEducation"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>About you</label>
                <Field
                  className={`form-control ${e?.about && t?.about && 'is-invalid'}`}
                  name="about"
                  as="textarea"
                  rows="5"
                  placeholder="Share a little bit about yourself! What insight can you offer? What questions do you want answers for?"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="about"
                  component="div"
                />
              </div>

            </Modal.Body>

            {
              props.initialValues ? (
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
              ) : (

                <Modal.Footer>
                  <Button
                    className="btn btn-dark"
                    type="submit"
                    disabled={isSubmitting}
                  >Create Profile</Button>
                </Modal.Footer>

              )
            }

          </Form>
        )
      }
      </Formik>
    </Modal>
  )
}

export default FormsProfileChangeModal
