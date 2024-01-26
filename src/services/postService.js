export const getAllPosts = async () => {
  return await fetch(
    `http://localhost:8088/posts?_expand=topic&_expand=user&_embed=likes`
  ).then((res) => res.json())
}

export const getPostById = async (postId) => {
  return await fetch(
    `http://localhost:8088/posts/${postId}?_expand=topic&_expand=user&_embed=likes`
  ).then((res) => res.json())
}

export const addNewPost = async (post) => {
  return await fetch(`http://localhost:8088/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json())
}

export const getPostByUserId = async (userId) => {
  return await fetch(`http://localhost:8088/posts?userId=${userId}`).then(
    (res) => res.json()
  )
}
export const deleteMyPost = async (postId) => {
  return await fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  }).then((res) => res.json())
}
