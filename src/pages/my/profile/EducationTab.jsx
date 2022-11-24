import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'

import { useGetMyEducationsQuery, useGetMyEducationQuery, useDeleteMyEducationMutation } from '@/services/api/my/MyEducations'
import FormsEducationsChangeModal from '@/forms/profile/EducationsChange'

import DeleteConfirmation from '@/components/DeleteConfirmation'
import GeneratePagination from '@/components/Pagination'
import ExperienceEducationSkeleton from '@/components/skeletons/ExperienceEducationSkeleton'

function Education({ education, setEditModalShow, setDeleteModalShow, setEducationInfo }) {
  const { id } = education
  const { data: educationInfo } = useGetMyEducationQuery(id)

  return (
    <article className="education" key={education?.id}>
      <div className="border rounded p-4 m-3">

        <div className="d-flex flex-row justify-content-end mb-1">
          <Dropdown>
            <Dropdown.Toggle
              id="post-dropdown"
              variant="secondary"
              className="btn btn-sm"
            >
              More
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" className="dropdown-menu dropdown-menu-sm">
              <Dropdown.Item onClick={() => {
                setEducationInfo(educationInfo)
                setEditModalShow(true)
              }}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => {
                setEducationInfo(educationInfo)
                setDeleteModalShow(true)
              }}
              >Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="d-flex flex-row justify-content-start align-items-top gap-5 px-5">
          <div className="d-flex flex-column me-5">
            <h6 className="education-school mb-2"><b>School:</b> <span className="text-capitalize">{education?.school}</span></h6>
            <h6 className="education-qualification my-2"><b>Qualification:</b> <span className="text-capitalize">{education?.qualification}</span></h6>
            <h6 className="education-period my-2"><em>{education?.startYear} {education?.endYear ? (` - ${education?.endYear}`) : ('')}</em></h6>
          </div>
        </div>

      </div>
    </article>
  )
}

function EducationTab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1

  const { data: { meta, educations: myEducations } = {}, isLoading, isSuccess, isError, error } = useGetMyEducationsQuery(currentPage)

  const handleChangePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  const [deleteMyEducation] = useDeleteMyEducationMutation()
  const handleDelete = (values) => {
    deleteMyEducation(values).unwrap().then(() => {
      // console.log(values)
    })
  }

  const [createModalShow, setCreateModalShow] = useState(false)
  const handleCreateModalClose = () => setCreateModalShow(false)
  const handleCreateModalShow = () => setCreateModalShow(true)

  const [editModalShow, setEditModalShow] = useState(false)

  const [deleteModalShow, setDeleteModalShow] = useState(false)

  const [educationInfo, setEducationInfo] = useState(null)

  const [showPagination, setShowPagination] = useState(false)

  useEffect(() => {
    if (myEducations?.length > 0) {
      setShowPagination(true)
    } else {
      setShowPagination(false)
    }
  }, [myEducations])

  let content

  if (isLoading) {
    content = (
      <ExperienceEducationSkeleton quantity={1} />
    )
  } else if (myEducations?.length === 0) {
    content = (
      <h5 className="text-muted fw-light">You have not added any information about your education history yet.</h5>
    )
  } else if (isSuccess) {
    // console.log(myEducations)
    content = myEducations.map((education) => (
      <Education
        key={education.id}
        education={education}
        setEditModalShow={setEditModalShow}
        setDeleteModalShow={setDeleteModalShow}
        setEducationInfo={setEducationInfo}
      />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-profile-education" className="container my-4 px-5 py-2">

      <div className="d-flex flex-row justify-content-end px-3 mb-4">
        <button
          className="btn btn-dark btn-sm"
          type="button"
          onClick={handleCreateModalShow}
        >Add Education</button>
      </div>

      <FormsEducationsChangeModal
        show={createModalShow}
        onHide={handleCreateModalClose}
      />
      <FormsEducationsChangeModal
        educationInfo={educationInfo}
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <DeleteConfirmation
        data={educationInfo}
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        confirm={handleDelete}
      />

      {content}

      <div
        className="my-4"
        style={{ display: showPagination ? '' : 'none' }}
      >
        <GeneratePagination meta={meta} changePage={handleChangePage} />
      </div>

    </div>
  )
}

export default EducationTab
