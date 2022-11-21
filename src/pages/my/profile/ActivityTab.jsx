import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { Modal } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

import { useGetMyPostsQuery, useGetMyPostQuery, useDeleteMyPostMutation } from '@/services/api/my/MyPosts'
import FormsPostsChange from '@/forms/profile/PostsChange'

import DeleteConfirmation from '@/components/DeleteConfirmation'
import { TimeAgo } from '../../../components/TimeAgo'

function Post({ post, setEditModalShow, setDeleteModalShow, setPostInfo }) {
  const { id } = post
  const { data: postInfo } = useGetMyPostQuery(id)

  return (
    <article className="post" key={post?.id}>
      <div className="border rounded p-4 m-3">
        <div className="d-flex flex-row justify-content-between mb-1">
          <TimeAgo timestamp={post?.createdAt} />

          <Dropdown>
            <Dropdown.Toggle
              id="post-dropdown"
              variant="secondary"
              className="btn btn-sm"
            >
              More
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" className="dropdown-menu dropdown-menu-sm">
              <Dropdown.Item href="#/action-2" className="mb-1"> View </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                setPostInfo(postInfo)
                setEditModalShow(true)
              }}
              > Edit </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => {
                setPostInfo(postInfo)
                setDeleteModalShow(true)
              }}
              >Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <h6 className="post-content my-4 pe-5">{post?.content.substring(0, 400)}</h6>
        {post?.image ? (
          <div className="text-center mt-3">
            <img
              src={post.image}
              className="rounded border"
              alt="post-picture"
              width="25%"
              height="auto"
            />
          </div>
        ) : ''}
      </div>
    </article>
  )
}

// postInfo={postInfo}
//         show={editModalShow}
//         onHide={() => setEditModalShow(false)}

function PostsChangeModal({ postInfo, show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit your post
        </Modal.Title>
      </Modal.Header>

      <FormsPostsChange postInfo={postInfo} onHide={onHide} />

    </Modal>
  )
}

function ActivityTab() {
  const { data: { posts: myPosts } = {}, isLoading, isSuccess, isError, error } = useGetMyPostsQuery()

  const [deleteMyPost] = useDeleteMyPostMutation()
  const handleDelete = (values) => {
    deleteMyPost(values).unwrap().then(() => {
      // console.log(values)
    })
  }
  const [editModalShow, setEditModalShow] = useState(false)

  const [deleteModalShow, setDeleteModalShow] = useState(false)

  const [postInfo, setPostInfo] = useState(null)

  let content

  if (isLoading) {
    content = (
      Array(10).fill(null).map((temp, i) => (
        <tr key={i}>
          <td><Skeleton /></td>
          <td><Skeleton /></td>
          <td><Skeleton /></td>
        </tr>
      ))
    )
  } else if (!myPosts) {
    content = ''
  } else if (isSuccess) {
    // console.log(myPosts)
    content = myPosts.map((post) => (
      <Post
        key={post.id}
        post={post}
        setEditModalShow={setEditModalShow}
        setDeleteModalShow={setDeleteModalShow}
        setPostInfo={setPostInfo}
      />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-profile-activity" className="container my-4 px-5 py-2">

      <FormsPostsChange />

      <PostsChangeModal
        postInfo={postInfo}
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />

      <DeleteConfirmation
        data={postInfo}
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        confirm={handleDelete}
      />

      {content}

    </div>
  )
}

export default ActivityTab
