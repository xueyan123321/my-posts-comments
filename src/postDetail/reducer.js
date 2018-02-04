import { GET_POST_DETAIL, GET_POST_COMMENTS, CHANGE_POST_VOTES, CHANGE_COMMENT_VOTES } from "./action";

export function postDetails(state={}, action){
    const { type, postDetails, changedPost} = action
    switch (type){
        case GET_POST_DETAIL:
            return postDetails
        case CHANGE_POST_VOTES:
            return changedPost
        default:
            return state
    }
}

export function postComments(state=[], action){
    const { type, postComments, comment } = action
    switch (type){
        case GET_POST_COMMENTS:
            return postComments
        // case CHANGE_COMMENT_VOTE:
        //     return Array.from(new Set([...state, comment]))
        default:
            return state
    }
}