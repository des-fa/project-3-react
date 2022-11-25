import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import UsersActivityTab from '@/pages/users/ActivityTab'
import UsersExperienceTab from '@/pages/users/ExperienceTab'
import UsersEducationTab from '@/pages/users/EducationTab'

import ActivityTab from '../pages/my/profile/ActivityTab'
import ExperienceTab from '../pages/my/profile/ExperienceTab'
import EducationTab from '../pages/my/profile/EducationTab'

function ProfileTabs(props) {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [key, setKey] = useState('activity')

  const removeQueryParams = () => {
    const param = searchParams.get('page')
    if (param) {
      searchParams.delete('page')
      setSearchParams(searchParams)
    }
  }

  return (
    <div
      className="container"
    >
      <Tabs
        id="profile-tabs"
        activeKey={key}
        onSelect={(k) => {
          setKey(k)
          removeQueryParams()
        }}
        className="mb-3"
      >

        <Tab
          eventKey="activity"
          title="Activity"
        >
          {!id ? (
            <ActivityTab />
          ) : (
            <UsersActivityTab posts={props.posts} />
          )}
        </Tab>

        <Tab
          eventKey="experience"
          title="Experience"
        >
          {!id ? (
            <ExperienceTab />
          ) : (
            <UsersExperienceTab experiences={props.experiences} />
          )}

        </Tab>

        <Tab
          eventKey="education"
          title="Education"
        >

          {!id ? (
            <EducationTab />
          ) : (
            <UsersEducationTab educations={props.educations} />
          )}
        </Tab>

      </Tabs>
    </div>
  )
}

export default ProfileTabs
