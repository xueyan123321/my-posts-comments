import { mainUrl } from "../globalConfig";
import uuid from 'uuid'
export const fetchCategories = () => fetch(`${mainUrl}/categories`,{
    headers: {
        Authorization: 'whatever-you-want'
    }
}).then(res => res.json())

export const fetchPosts = (category='') => {
    if(category){
        category = category + '/'
    }
    return fetch(`${mainUrl}/${category}posts`, {
        headers:{
            Authorization: 'whatever-you-want'
        }
    }).then(res => res.json())
}

export const fetchPostDetail = (id) => fetch(`${mainUrl}/posts/${id}`, {
    headers: {
        Authorization: 'whatever-you-want'
    }
}).then(res => res.json())

export const fetchPostComments = (id) => fetch(`${mainUrl}/posts/${id}/comments`, {
    headers:{
        Authorization: 'whatever-you-want'
    }
}).then(res => res.json())

export const changePostVotes = (id, method) => fetch(`${mainUrl}/posts/${id}`, {
    method:'POST',
    headers:{
        'Authorization': 'whatever-you-want',
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        option:method
    })
}).then(res => res.json())
    .catch((err) => {
        alert(err.message)
    })

export const changeCommentVotes = (id, method) => fetch(`${mainUrl}/comments/${id}`, {
    method: 'POST',
    headers:{
        'Authorization': 'whatever-you-want',
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        option:method
    })
}).then(res => res.json())
    .catch((err) => {
        alert(err.message)
    })

export const editPostDetail = (id, title, body) => fetch(`${mainUrl}/post/${id}`,{
    method:'PUT',
    headers:{
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        title,
        body
    })
})

export const createPost = (title, body, author, category) => fetch(`${mainUrl}/posts`,{
    method: 'POST',
    headers:{
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        id: uuid(),
        title,
        body,
        timestamp: Date.now(),
        author,
        category
    })
}).then(res => res.json())
    .catch(err => alert(err.message))

export const editPost = (id, title, body, author, category) => fetch(`${mainUrl}/posts/${id}`, {
    method: 'PUT',
    headers:{
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title,
        body,
        timestamp: Date.now(),
        author,
        category
    })
}).then(res => res.json())
    .catch(err => alert(err.message))

export const deletePost = (id) => fetch(`${mainUrl}/posts/${id}`, {
    method: 'DELETE',
    headers:{
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
    }
}).then(res => res.json())
    .catch(err => alert(err.message))

export const createComment = (body, author, parentId) => fetch(`${mainUrl}/comments`, {
    method: 'POST',
    headers:{
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: uuid(),
        body,
        author,
        parentId,
        timestamp:Date.now()
    })
}).then(res => res.json())
    .catch(err => alert(err.message))

export const editComment = (body, author,id) => fetch(`${mainUrl}/comments/${id}`,{
    method:'PUT',
    headers:{
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        timestamp: Date.now(),
        body,
        author
    })
}).then(res => res.json())
    .catch(err => alert(err.message))

export const deleteComment = (id) => fetch(`${mainUrl}/comments/${id}`, {
    method: 'DELETE',
    headers:{
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        deleted: true
    })
}).then(res => {
    return res.json()
})
    .catch(err => alert(err.message))
