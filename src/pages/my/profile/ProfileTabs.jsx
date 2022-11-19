import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import ActivityTab from './ActivityTab'
import ExperienceTab from './ExperienceTab'

function ProfileTabs() {
  const [key, setKey] = useState('activity')

  return (
    <div className="container">
      <Tabs
        id="profile-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="activity" title="Activity">
          <ActivityTab />
        </Tab>
        <Tab eventKey="experience" title="Experience">
          <ExperienceTab />

        </Tab>
        <Tab eventKey="education" title="Education" />
      </Tabs>
    </div>
  )
}

export default ProfileTabs
