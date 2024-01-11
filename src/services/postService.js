export const getAllPosts = async () => {
  return await fetch(`http://localhost:8088/posts`).then((res) => res.json())
}
