import React from 'react'
// import { skipToken } from '@reduxjs/toolkit/dist/query'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import { useLazyGetUsersQuery } from '@/services/api/Users'
import { useSearchParams } from 'react-router-dom'

const initialValues = {
  q: ''
}

function FormsSearch(props) {
  // const [myState, setState] = useState(skipToken)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchInput = searchParams.get('q')
  // const removeQueryParams = () => {
  //   const param = searchParams.get('q')
  //   if (param) {
  //     searchParams.delete('q')
  //     setSearchParams({ q: '' })
  //   }
  // }
  const [trigger, { data, isSuccess }] = useLazyGetUsersQuery()

  const handleSubmit = async (values, { resetForm }) => {
    // await setSearchParams({ q: values.q })
    trigger(searchInput)

    if (isSuccess) {
      resetForm()
    }
  }

  // const [click, setClick] = useState(true)
  // const { data } = useGetUsersQuery(undefined, { skip: click })
  // {(values) => {
  //       console.log(values)
  //       setClick(false)
  //     }}
  console.log(data)

  return (
    <Formik
      initialValues={props.query || initialValues}
      onSubmit={handleSubmit}
      // {(values) => {
      //   console.log(values)
      //   trigger(values)
      // }}
      enableReinitialize
      validationSchema={
      Yup.object({
        q: Yup.string().required().trim().label('Search query')
      })
      }
    >
      {
      ({ errors: e, touched: t, isSubmitting, setFieldValue }) => (
        <Form>
          <div className="d-flex flex-row ms-4 align-items-center">

            <div className="d-flex flex-column me-3">
              <Field
                className={`form-control ${e?.q && t?.q && 'is-invalid'}`}
                name="q"
                placeholder="Connect with others"
                onChange={async (event) => {
                  await setFieldValue('q', event.target.value)
                  setSearchParams({ q: event.target.value })
                }}
              />
              {/* <ErrorMessage
                className="invalid-feedback"
                name="q"
                component="div"
              /> */}
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
