import React, { useState } from 'react'
// import { skipToken } from '@reduxjs/toolkit/dist/query'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useGetMyUsersQuery } from '@/services/api/Users'

const initialValues = {
  q: ''
}

function FormsSearch(props) {
  // const [myState, setState] = useState(skipToken)
  // const result = useGetMyUsersQuery(myState)
  // const { data } = useGetMyUsersQuery(q)

  // const handleSubmit = (query) => {
  //   setState(query)
  //   console.log(result)
  // }

  // const [trigger, result] = useLazyGetMyUsersQuery()
  // const handleSubmit = (q) => {
  //   trigger(q)
  //   console.log(result.data)
  // }
  const [click, setClick] = useState(true)
  const [query, setQuery] = useState('')
  const { data } = useGetMyUsersQuery(query, { skip: click })

  const changeSkip = () => {
    setClick(false)
  }

  const changeQuery = () => setQuery()

  return (
    <Formik
      initialValues={props.query || initialValues}
      onSubmit={(q) => { changeQuery(q); changeSkip() }}
      enableReinitialize
      validationSchema={
      Yup.object({
        q: Yup.string().required().trim().label('Search query')
      })
      }
    >
      {
      ({ errors: e, touched: t, isSubmitting }) => (
        <Form>
          <div className="d-flex flex-row ms-4 align-items-center">

            <div className="d-flex flex-column me-3">
              <Field
                className={`form-control ${e?.q && t?.q && 'is-invalid'}`}
                name="q"
                placeholder="Connect with others"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="q"
                component="div"
              />
            </div>

            <div className="d-flex flex-column">
              <button
                className="btn btn-outline-secondary"
                type="submit"
                disabled={isSubmitting}
              >Search</button>
            </div>

          </div>
        </Form>
      )
      }
    </Formik>
  )
}

export default FormsSearch
