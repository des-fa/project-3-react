import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import { useNavigate } from 'react-router-dom'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useUpdateMyExperienceMutation, useCreateMyExperienceMutation } from '@/services/api/MyExperiences'

const initialValues = {
  job: '',
  company: '',
  startYear: '',
  endYear: '',
  description: ''
}

function FormsExperiencesChangeModal(props) {
  // const navigate = useNavigate()
  const [createMyExperience] = useCreateMyExperienceMutation()
  const [updateMyExperience] = useUpdateMyExperienceMutation()

  const handleSubmit = props.experienceInfo ? (

    async (values) => {
      await updateMyExperience(values)
        .then(() => {
          console.log(values)
          props.onHide()
        })
    }

  ) : (
    (values) => {
      createMyExperience(values).unwrap().then(() => {
        props.onHide()
        console.log(values)
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
          Add details about your job experience
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={props.experienceInfo || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={
        Yup.object({
          job: Yup.string().required().trim().label('Job title'),
          company: Yup.string().trim().required().label('Place of employment'),
          startYear: Yup.number().integer().required()
            .label('Starting year of employment'),
          endYear: Yup.number().integer().nullable().label('Ending year of employment'),
          description: Yup.string().trim().required().label('Brief job description')
        })
    }
      >
        {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <label>Job Title</label>
                <Field
                  className={`form-control ${e?.job && t?.job && 'is-invalid'}`}
                  name="job"
                  placeholder="What position did you hold?"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="job"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Place of Employment</label>
                <Field
                  className={`form-control ${e?.company && t?.company && 'is-invalid'}`}
                  name="company"
                  placeholder="Where were you employed?"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="company"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Starting Year</label>
                <Field
                  className={`form-control ${e?.startYear && t?.startYear && 'is-invalid'}`}
                  name="startYear"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="startYear"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Ending Year (not required)</label>
                <Field
                  className={`form-control ${e?.endYear && t?.endYear && 'is-invalid'}`}
                  name="endYear"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="endYear"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Brief Job Description</label>
                <Field
                  className={`form-control ${e?.description && t?.description && 'is-invalid'}`}
                  name="description"
                  as="textarea"
                  rows="5"
                  placeholder="Share a little bit about what you did!"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="description"
                  component="div"
                />
              </div>

            </Modal.Body>

            {
            props.experienceInfo ? (
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={props.onHide}>
                  Cancel
                </Button>              <Button
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
                >Create Experience</Button>
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

export default FormsExperiencesChangeModal
