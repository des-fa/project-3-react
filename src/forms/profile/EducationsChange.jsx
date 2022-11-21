import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useUpdateMyEducationMutation, useCreateMyEducationMutation } from '@/services/api/my/MyEducations'

const initialValues = {
  school: '',
  qualification: '',
  startYear: '',
  endYear: ''
}

function FormsEducationsChangeModal(props) {
  const [createMyEducation] = useCreateMyEducationMutation()
  const [updateMyEducation] = useUpdateMyEducationMutation()

  const handleSubmit = props.educationInfo ? (

    async (values) => {
      await updateMyEducation(values)
        .then(() => {
          // console.log(values)
          props.onHide()
        })
    }

  ) : (
    (values) => {
      createMyEducation(values).unwrap().then(() => {
        props.onHide()
        // console.log(values)
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
        {
        props.educationInfo ? (
          <Modal.Title id="contained-modal-title-vcenter">
            Edit details for this education record
          </Modal.Title>
        ) : (
          <Modal.Title id="contained-modal-title-vcenter">
            Add details about your education history
          </Modal.Title>
        )
        }
      </Modal.Header>

      <Formik
        initialValues={props.educationInfo || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={
        Yup.object({
          school: Yup.string().required().trim().label('Educational institution'),
          qualification: Yup.string().trim().required().label('Qualification completed'),
          startYear: Yup
            .number()
            .integer()
            .test('len', 'Must be exactly 4 numbers', (val) => val && val.toString().length === 4)
            .required()
            .label('Starting year of education'),
          endYear: Yup
            .number()
            .integer()
            .nullable()
            .test('len', 'Must be exactly 4 numbers', (val) => !val || val.toString().length === 4)
            .label('Ending year of education')
        })
        }
      >
        {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <label>Educational Institution</label>
                <Field
                  className={`form-control ${e?.school && t?.school && 'is-invalid'}`}
                  name="school"
                  placeholder="What was the name of the school you attended?"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="school"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Qualification Received</label>
                <Field
                  className={`form-control ${e?.qualification && t?.qualification && 'is-invalid'}`}
                  name="qualification"
                  placeholder="What qualification/degree did you obtain?"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="qualification"
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
            </Modal.Body>

            {
            props.educationInfo ? (
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
                >Create Education</Button>
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

export default FormsEducationsChangeModal
