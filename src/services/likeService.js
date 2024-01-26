export const getLikes = async () => {
  return await fetch(`http://localhost:8088/likes`).then((res) => res.json())
}

export const addLike = async (like) => {
  return await fetch(`http://localhost:8088/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  }).then((res) => res.json())
}

export const deleteLike = async (like) => {
  return await fetch(`http://localhost:8088/likes/${like.id}`, {
    method: "DELETE",
  }).then((res) => res.json())
}
