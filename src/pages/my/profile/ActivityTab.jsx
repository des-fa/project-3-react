import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { Modal } from 'react-bootstrap'

import { useGetMyPostsQuery, useGetMyPostQuery, useDeleteMyPostMutation } from '@/services/api/my/MyPosts'
import FormsPostsChange from '@/forms/profile/PostsChange'

import DeleteConfirmation from '@/components/DeleteConfirmation'
import ReadMore from '@/components/ReadMore'
import GeneratePagination from '@/components/Pagination'
import ImageModal from '@/components/ImageModal'
import PostSkeleton from '@/components/PostSkeleton'
import { TimeAgo } from '../../../components/TimeAgo'

function Post({ post, setEditModalShow, setDeleteModalShow, setPostInfo }) {
  const { id } = post
  const { data: postInfo } = useGetMyPostQuery(id)

  // image modal
  const [showImageModal, setShowImageModal] = useState(false)

  const handleClose = () => setShowImageModal(false)
  const handleShow = () => setShowImageModal(true)

  return (
    <article className="post" key={post?.id}>
      <div className="border rounded p-4 m-3">
        <div className="d-flex flex-row justify-content-between ms-5 mb-1">
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
              {/* <Dropdown.Item href="#/action-2" className="mb-1"> View </Dropdown.Item> */}
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

        <div className="mt-4 px-5">
          <ReadMore text={post?.content} />
        </div>
        {/* <h6 className="post-content my-4 pe-5">{post?.content.substring(0, 400)}</h6> */}

        {post?.image ? (
          <div className="text-center">
            <img
              src={post.image}
              className="rounded border trigger-img-modal"
              alt="post-picture"
              // width="35%"
              // height="auto"
              style={{
                minWidth: '40%%',
                maxWidth: 400,
                minHeight: '40%',
                maxHeight: 300
              }}
              onClick={handleShow}
            />
          </div>
        ) : ''}

        <ImageModal show={showImageModal} onHide={handleClose} image={post?.image} />

      </div>
    </article>
  )
}

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
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1

  const { data: { meta, posts: myPosts } = {}, isLoading, isSuccess, isError, error } = useGetMyPostsQuery(currentPage)

  const handleChangePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  const [deleteMyPost] = useDeleteMyPostMutation()
  const handleDelete = (values) => {
    deleteMyPost(values).unwrap().then(() => {
      // console.log(values)
    })
  }
  const [editModalShow, setEditModalShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [postInfo, setPostInfo] = useState(null)

  const [showPagination, setShowPagination] = useState(false)

  useEffect(() => {
    if (myPosts?.length > 0) {
      setShowPagination(true)
    } else {
      setShowPagination(false)
    }
  }, [myPosts])

  let content

  if (isLoading) {
    content = (
      <PostSkeleton quantity={1} />
    )
  } else if (myPosts?.length === 0) {
    content = (
      <h5 className="text-muted mt-5 ms-3 fw-light">You have not created any posts yet.</h5>
    )
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

      <div
        className="my-4"
        style={{ display: showPagination ? '' : 'none' }}
      >
        <GeneratePagination meta={meta} changePage={handleChangePage} />
      </div>

    </div>
  )
}

export default ActivityTab
