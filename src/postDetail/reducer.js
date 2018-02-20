import {
    GET_POST_DETAIL, GET_POST_COMMENTS, CHANGE_POST_VOTES, CHANGE_COMMENT_VOTES, CREATE_COMMENT, EDIT_COMMENT,
    DELETE_COMMENT
} from "./actionType";

export function postDetails(state={}, action){
    const { type, postDetails, changedPost} = action
    switch (type){
        case GET_POST_DETAIL:
            return postDetails
        case CHANGE_POST_VOTES:
            return changedPost
        case CREATE_COMMENT:
            return {...state, commentCount:(state.commentCount+1)}
        case DELETE_COMMENT:
            return {...state, commentCount:(state.commentCount-1)}
        default:
            return state
    }
}

export function postComments(state=[], action){
    const { type, postComments, comment, newComment, editComment, deletedComment } = action
    switch (type){
        case GET_POST_COMMENTS:
            return postComments
        case CHANGE_COMMENT_VOTES:
            let copyStateChange = [...state]
            copyStateChange.forEach(item=> {
                if(item.id === comment.id){
                    item.voteScore = comment.voteScore
                }
            })
            return copyStateChange
        case CREATE_COMMENT:
            return [...state, newComment]
        case EDIT_COMMENT:
            let copyStateEdit = [...state]
            copyStateEdit.forEach(item => {
                if(item.id === editComment.id){
                    item.body = editComment.body
                    item.author = editComment.author
                    item.timestamp = editComment.timestamp
                }
            })
            return copyStateEdit
        case DELETE_COMMENT:
            return state.filter(item => item.id !== deletedComment.id)
        default:
            return state
    }
}