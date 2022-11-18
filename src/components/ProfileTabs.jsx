import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import ActivityTab from './ActivityTab'

function ProfileTabs() {
  return (
    <div className="container">
      <Tabs
        defaultActiveKey="activity"
        id="profile-tabs"
        className="mb-3"
      >
        <Tab eventKey="activity" title="Activity">
          <ActivityTab />
        </Tab>
        <Tab eventKey="experience" title="Experience" />
        <Tab eventKey="education" title="Education" />
      </Tabs>
    </div>
  )
}

export default ProfileTabs
