import * as fetchUtil from '../utilAPI'

import { GET_CATEGORIES, GET_POSTS, SORT_POSTS} from "./actionType";

export const receiveCategories = categories => ({
    type: GET_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
    fetchUtil.fetchCategories().then(res =>dispatch(receiveCategories(res.categories)))
)

export const receivePosts = posts => ({
    type: GET_POSTS,
    posts
})

export const sortPosts = method => ({
    type: SORT_POSTS,
    method
})

export const fetchPosts = (category='') => dispatch => (
    fetchUtil.fetchPosts(category).then(posts => dispatch(receivePosts(posts)))
)