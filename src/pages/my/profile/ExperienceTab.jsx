import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'

import { useGetMyExperiencesQuery, useGetMyExperienceQuery, useDeleteMyExperienceMutation } from '@/services/api/my/MyExperiences'
import FormsExperiencesChangeModal from '@/forms/profile/ExperiencesChange'

import DeleteConfirmation from '@/components/DeleteConfirmation'
import GeneratePagination from '@/components/Pagination'
import ExperienceEducationSkeleton from '@/components/ExperienceEducationSkeleton'

function Experience({ experience, setEditModalShow, setDeleteModalShow, setExperienceInfo }) {
  const { id } = experience
  const { data: experienceInfo } = useGetMyExperienceQuery(id)

  return (
    <article className="experience" key={experience?.id}>
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
                setExperienceInfo(experienceInfo)
                setEditModalShow(true)
              }}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => {
                setExperienceInfo(experienceInfo)
                setDeleteModalShow(true)
              }}
              >Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="d-flex flex-row justify-content-start align-items-top gap-5 px-5">

          <div className="col-3">

            <div className="w-100">
              <h6 className="experience-job mb-2"><b>Job Title: </b><span className="text-capitalize">{experience?.job}</span></h6>
              <h6 className="experience-company my-2"><b>Company: </b><span className="text-capitalize">{experience?.company}</span></h6>
              <h6 className="experience-period my-2"><em>{experience?.startYear} {experience?.endYear ? (` - ${experience?.endYear}`) : ('')}</em></h6>
            </div>

          </div>

          <div className="d-flex flex-column me-5">
            <h6>Description</h6>
            <p>{experience?.description}</p>
          </div>

        </div>

      </div>
    </article>
  )
}

function ExperienceTab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1

  const { data: { meta, experiences: myExperiences } = {}, isLoading, isSuccess, isError, error } = useGetMyExperiencesQuery(currentPage)

  const handleChangePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  const [deleteMyExperience] = useDeleteMyExperienceMutation()
  const handleDelete = (values) => {
    deleteMyExperience(values).unwrap().then(() => {
      // console.log(values)
    })
  }

  const [createModalShow, setCreateModalShow] = useState(false)
  const handleCreateModalClose = () => setCreateModalShow(false)
  const handleCreateModalShow = () => setCreateModalShow(true)

  const [editModalShow, setEditModalShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [experienceInfo, setExperienceInfo] = useState(null)

  const [showPagination, setShowPagination] = useState(false)

  useEffect(() => {
    if (myExperiences?.length > 0) {
      setShowPagination(true)
    } else {
      setShowPagination(false)
    }
  }, [myExperiences])

  let content

  if (isLoading) {
    content = (
      <ExperienceEducationSkeleton quantity={1} />
    )
  } else if (myExperiences?.length === 0) {
    content = (
      <h5 className="text-muted fw-light">You have not added any information about your work experience yet.</h5>
    )
  } else if (isSuccess) {
    // console.log(myExperiences)
    content = myExperiences.map((experience) => (
      <Experience
        key={experience.id}
        experience={experience}
        // show={editModalShow}
        setEditModalShow={setEditModalShow}
        setDeleteModalShow={setDeleteModalShow}
        setExperienceInfo={setExperienceInfo}
        // onClick={() => setEditModalShow(true)}
        // onHide={() => setEditModalShow(false)}
      />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-profile-experience" className="container my-4 px-5 py-2">

      <div className="d-flex flex-row justify-content-end px-3 mb-4">
        <button
          className="btn btn-dark btn-sm"
          type="button"
          onClick={handleCreateModalShow}
        >Add Experience</button>
      </div>

      <FormsExperiencesChangeModal
        show={createModalShow}
        onHide={handleCreateModalClose}
      />
      <FormsExperiencesChangeModal
        experienceInfo={experienceInfo}
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <DeleteConfirmation
        data={experienceInfo}
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

export default ExperienceTab
