import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import FollowingTab from './FollowingTab'
import FollowersTab from './FollowersTab'

function ConnectionsTabs() {
  const [key, setKey] = useState('following')

  return (
    <div className="container my-5 px-4">
      <Tabs
        id="connections-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="following" title="Following">
          <FollowingTab />
        </Tab>
        <Tab eventKey="followers" title="Followers">
          <FollowersTab />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ConnectionsTabs
