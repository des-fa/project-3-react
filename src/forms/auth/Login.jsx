import React from 'react'
import Button from 'react-bootstrap/Button'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import FormsAuthSignupModal from '@/forms/auth/Signup'

const initialValues = {
  email: '',
  password: ''
}

function FormsAuthLogin(props) {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          email: Yup.string().required().label('Email'),
          password: Yup.string().min(6).required().label('Password')
        })
      }
    >
      {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form
            className="p-5 border rounded-3 bg-light"
            // style={{ height: '400px' }}
          >
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

            <button
              className="btn btn-dark w-100 btn-lg mt-2"
              type="submit"
              disabled={isSubmitting}
            >Log In</button>

            <hr className="my-4" />

            <Button variant="secondary" className="w-100" onClick={() => setModalShow(true)}>
              Create a new account
            </Button>

            <FormsAuthSignupModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Form>
        )
      }
    </Formik>
  )
}

export default FormsAuthLogin
