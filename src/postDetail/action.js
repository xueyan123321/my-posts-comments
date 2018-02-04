import * as fetchUtil from '../utilAPI'

export const GET_POST_DETAIL = 'GET_POST_DETAIL'
export const CHANGE_POST_VOTES = 'CHANGE_POST_VOTES'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const CHANGE_COMMENT_VOTES = 'CHANGE_COMMENT_VOTES'

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

export const changeCommentVotes = (comment) => ({
    type: CHANGE_COMMENT_VOTES,
    comment
})


export const fetchPostDetail = id => dispatch => fetchUtil.fetchPostDetail(id).then(res => dispatch(receivePostDetail(res)))

export const fetchPostComments = id => dispatch => fetchUtil.fetchPostComments(id).then(res => dispatch(receivePostComments(res)))

export const mutatePostVotes = (id, method) => dispatch => fetchUtil.changePostVotes(id, method).then(res => dispatch(changePostVotes(res)))

export const mutateCommentVotes = (id, method) => dispatch => fetchUtil.changeCommentVotes(id, method).then(res => dispatch(changeCommentVotes(res)))