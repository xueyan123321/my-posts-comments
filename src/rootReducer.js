import { categories, posts } from "./mainPage/reducer";
import { postDetails, postComments } from './postDetail/reducer'
import { combineReducers } from 'redux';

export default combineReducers({
    categories,
    posts,
    postDetails,
    postComments
});
