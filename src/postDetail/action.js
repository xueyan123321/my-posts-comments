import * as fetchUtil from '../utilAPI'

import {GET_POST_DETAIL, GET_POST_COMMENTS, CHANGE_POST_VOTES, DELETE_POST, CHANGE_COMMENT_VOTES, CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from "./actionType";


export const receivePostDetail = (postDetails) => ({
    type: GET_POST_DETAIL,
        postDetails
})

export const receivePostComments = (postComments) => ({
    type: GET_POST_COMMENTS,
    postComments
})

export const changePostVotes = (changedPost) => ({
    type: CHANGE_POST_VOTES,
    changedPost
})

export const deletePost = (deletedPost) => ({
    type: DELETE_POST,
    deletedPost
})

export const changeCommentVotes = (comment) => ({
    type: CHANGE_COMMENT_VOTES,
    comment
})

export const createComment = (newComment) => ({
    type: CREATE_COMMENT,
    newComment
})

export const editComment = (editComment) => ({
    type: EDIT_COMMENT,
    editComment
})

export const deleteComment = (deletedComment) => ({
    type: DELETE_COMMENT,
    deletedComment
})


export const fetchPostDetail = id => dispatch => fetchUtil.fetchPostDetail(id).then(res => dispatch(receivePostDetail(res)))

export const fetchPostComments = id => dispatch => fetchUtil.fetchPostComments(id).then(res => dispatch(receivePostComments(res)))

export const deletePostRequest = id => dispatch => fetchUtil.deletePost(id).then(res => dispatch(deletePost(res)))

export const mutatePostVotes = (id, method) => dispatch => fetchUtil.changePostVotes(id, method).then(res => dispatch(changePostVotes(res)))

export const mutateCommentVotes = (id, method) => dispatch => fetchUtil.changeCommentVotes(id, method).then(res => dispatch(changeCommentVotes(res)))

export const postComment = (body, author, parentId) => dispatch => fetchUtil.createComment(body, author, parentId).then(res => dispatch(createComment(res)))

export const requestEditComment = (body,author,id) => dispatch => fetchUtil.editComment(body,author,id).then(res => dispatch(editComment(res)))

export const requestDeleteComment = id => dispatch => fetchUtil.deleteComment(id).then(res => dispatch(deleteComment(res)))