import { GET_CATEGORIES, GET_POSTS, SORT_POSTS } from "./action";
import {CHANGE_POST_VOTES} from "../postDetail/action";


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
    const {type, posts, method} = action
    switch(type){
        case GET_POSTS:
            return posts
        case SORT_POSTS:
            state.sort((pre ,next) => {
                return pre[method] - next[method]
            })
            return [...state]
        default:
            return state
    }
}
