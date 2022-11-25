import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import FollowingTab from './FollowingTab'
import FollowersTab from './FollowersTab'

function ConnectionsTabs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [key, setKey] = useState('following')

  const removeQueryParams = () => {
    const param = searchParams.get('page')
    if (param) {
      searchParams.delete('page')
      setSearchParams(searchParams)
    }
  }

  return (
    <div className="container my-5 px-4">
      <Tabs
        id="connections-tabs"
        activeKey={key}
        onSelect={(k) => {
          setKey(k)
          removeQueryParams()
        }}
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
