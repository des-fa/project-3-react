import React, { useRef, useState, useEffect } from 'react'
import { Badge, Button } from 'react-bootstrap'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useCreateMyPostMutation, useUpdateMyPostMutation } from '@/services/api/my/MyPosts'
import defaultImage from '../../assets/defaultImage.png'

const initialValues = {
  content: '',
  image: ''
}

function FormsPostsChange(props) {
  const [inputText, setInputText] = useState('')
  const [characterLimit] = useState(1000)

  const [imagePreview, setImagePreview] = useState(props?.postInfo?.image || props?.initialValues?.image || defaultImage)
  const imageRef = useRef(null)

  const [createMyPost] = useCreateMyPostMutation()
  const [updateMyPost] = useUpdateMyPostMutation()

  // charCount when updating
  useEffect(() => {
    if (props?.postInfo?.content) {
      setInputText(props?.postInfo?.content)
      // console.log(props.postInfo.content.length)
      console.log('checked posts')
    }
  }, [props?.postInfo])

  const handleSubmit = props.postInfo ? (
    async (data) => {
      // console.log(data)
      await updateMyPost(data).unwrap().then(() => {
        // console.log(data)
        props.onHide()
        setInputText('')
      })
    }
  ) : (
    async (data, { resetForm, setFieldValue }) => {
      // console.log(data)
      await createMyPost(data).unwrap().then(() => {
        // console.log(data)
        resetForm({ values: '' })
        setImagePreview(defaultImage)
        setFieldValue('image', '')
        imageRef.current.value = null
        setInputText('')
      })
    }
  )

  return (

    <Formik
      initialValues={props.postInfo || initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          content: Yup
            .string()
            .trim()
            .max(1000, 'Maximum 1000 characters.')
            // .test(
            //   'len',
            //   'This section  must be between 1 and 1000 characters.',
            //   (val) => (val.length >= 1 && val.length <= 1000)
            // )
            .required()
            .label('Content'),
          image: Yup
            .mixed()
            .nullable()
        })
      }
    >
      {
        ({ errors: e, touched: t, isSubmitting, setFieldValue }) => (
          <div className="border rounded p-4 m-3">

            <Form>
              <div className="mb-3">
                <div className="d-flex flex-row justify-content-end mb-0">
                  <Badge className="mb-3" bg={`${inputText.length > characterLimit ? 'danger' : 'secondary'}`}>{inputText.length}/{characterLimit}</Badge>
                </div>
                <Field
                  className={`form-control ${e?.content && t?.content && 'is-invalid'}`}
                  name="content"
                  as="textarea"
                  rows="5"
                  placeholder="What would you like to share?"
                  onChange={(event) => {
                    setFieldValue('content', event.target.value)
                    setInputText(event.target.value)
                  }}
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="content"
                  component="div"
                />
              </div>

              {/* <div className="mb-3">
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(event) => {
                    setFieldValue('image', event.currentTarget.files[0])
                  }}
                />
              </div> */}

              <div className="d-flex flex-row justify-content-start align-items-center gap-4">
                <div className="col-auto">
                  <img
                    src={imagePreview}
                    className="img-thumbnail rounded"
                    width="90px"
                  />
                </div>

                <div className="col-auto">
                  <div className="input-group input-group-sm mb-3 mt-0">
                    <label className="input-group-text" htmlFor="image">Upload</label>
                    <input
                      ref={imageRef}
                      id="image"
                      className={`form-control ${e?.image && 'is-invalid'}`}
                      name="image"
                      type="file"
                      onChange={(event) => {
                        const fileReader = new FileReader()
                        fileReader.onload = () => {
                          if (fileReader.readyState === 2) {
                            setFieldValue('image', fileReader.result)
                            setImagePreview(fileReader.result)
                          }
                        }
                        fileReader.readAsDataURL(event.target.files[0])
                      }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => {
                        setImagePreview(props?.initialValues?.image || defaultImage)
                        setFieldValue('image', '')
                        imageRef.current.value = null
                      }}
                    >X</button>

                    <ErrorMessage
                      className="invalid-feedback"
                      name="image"
                      component="div"
                    />

                  </div>
                </div>
              </div>
              {
              props.postInfo ? (
                <div className="d-flex flex-row justify-content-end gap-2">

                  <Button variant="outline-secondary" onClick={props.onHide}>
                    Cancel
                  </Button>
                  <Button
                    className="btn btn-dark"
                    type="submit"
                    disabled={isSubmitting}
                  >Save Changes</Button>
                </div>

              ) : (
                <div className="d-flex flex-row justify-content-end">
                  <Button
                    className="btn btn-dark btn-sm mt-0"
                    type="submit"
                    disabled={isSubmitting}
                  >Create Post</Button>
                </div>
              )
              }
            </Form>

          </div>
        )
      }
    </Formik>
  )
}

export default FormsPostsChange
