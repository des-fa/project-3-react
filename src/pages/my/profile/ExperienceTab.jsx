import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Skeleton from 'react-loading-skeleton'

import { useGetMyExperiencesQuery, useGetMyExperienceQuery, useDeleteMyExperienceMutation } from '@/services/api/my/MyExperiences'
import FormsExperiencesChangeModal from '@/forms/profile/ExperiencesChange'
import DeleteConfirmation from '@/components/DeleteConfirmation'

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

        <div className="d-flex flex-row justify-content-evenly align-items-top px-5">

          <div className="d-flex flex-column me-5 mw-25">

            <div className="w-100">
              <h6 className="experience-job mb-2"><b>Job Title: </b><span className="text-capitalize">{experience?.job}</span></h6>
              <h6 className="experience-company my-2"><b>Company: </b><span className="text-capitalize">{experience?.company}</span></h6>
              <h6 className="experience-period my-2"><em>{experience?.startYear} {experience?.endYear ? (` - ${experience?.endYear}`) : ('')}</em></h6>
            </div>

          </div>

          <div className="d-flex flex-column w-50 me-5">
            <h6>Description</h6>
            <p>{experience?.description}</p>
          </div>

        </div>

      </div>
    </article>
  )
}

function ExperienceTab() {
  const { data: { experiences: myExperiences } = {}, isLoading, isSuccess, isError, error } = useGetMyExperiencesQuery()

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

  let content

  if (isLoading) {
    content = (
      <Skeleton count={5} />
    )
  } else if (!myExperiences) {
    content = ''
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

    </div>
  )
}

export default ExperienceTab
