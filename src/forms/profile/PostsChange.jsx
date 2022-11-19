import React from 'react'
import { Button } from 'react-bootstrap'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  content: '',
  image: ''
}

function FormsPostsChange(props) {
  return (

    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          content: Yup.string().required().trim().label('Content'),
          image: Yup.mixed()
        })
      }
    >
      {
        ({ errors: e, touched: t, isSubmitting, setFieldValue }) => (
          <div className="border rounded p-4 m-3">

            <Form>
              <div className="mb-3">
                <Field
                  className={`form-control ${e?.content && t?.content && 'is-invalid'}`}
                  name="content"
                  as="textarea"
                  rows="5"
                  placeholder="What would you like to share?"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="content"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(event) => {
                    setFieldValue('image', event.currentTarget.files[0])
                  }}
                />
              </div>

              <div className="d-flex flex-row justify-content-end">
                <Button
                  className="btn btn-dark btn-sm"
                  type="submit"
                  disabled={isSubmitting}
                >Create Post</Button>
              </div>

            </Form>

          </div>
        )
      }
    </Formik>
  )
}

export default FormsPostsChange
