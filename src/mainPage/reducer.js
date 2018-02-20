import { GET_CATEGORIES, GET_POSTS, SORT_POSTS } from "./actionType";
import {CHANGE_POST_VOTES, DELETE_POST} from "../postDetail/actionType";


export function categories(state = [], action){
    const {type, categories} = action
    switch(type){
        case GET_CATEGORIES:
            return categories
        default:
            return state
    }
}

export function posts(state=[], action){
    const {type, posts, method, changedPost, deletedPost} = action
    switch(type){
        case GET_POSTS:
            return posts
        case SORT_POSTS:
            let copyStateSort = [...state]
            copyStateSort.sort((pre ,next) => {
                return pre[method] - next[method]
            })
            return copyStateSort
        case CHANGE_POST_VOTES:
            let copyStateChange = [...state]
            copyStateChange.forEach(item => {
                if(item.id === changedPost.id){
                    item.voteScore = changedPost.voteScore
                }
            })
            return copyStateChange
        case DELETE_POST:
            return state.filter(item => item.id !== deletedPost.id)
        default:
            return state
    }
}
