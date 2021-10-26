// New Comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#comment-desc').value.trim();
  const post_id = event.target.getAttribute("data-post_id");

  if (body) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ body, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload;
    } else {
      alert('Failed to create comment');
    }
  }
};

// Update Comment
const updateCommentHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#update-name").value.trim();
  const description = document.querySelector("#update-desc").value.trim();
  const id = event.target.getAttribute("data-post_id");
  console.log(event.target);
  console.log(id);
  if (name && description) {
    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to update comment");
    }
  }
};

// Delete Comment
const deleteCommentHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/:id/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);

document
  .querySelector(".update-form")
  .addEventListener("submit", updateCommentHandler);

document
  .querySelector('.comment-list')
  .addEventListener('click', deleteCommentHandler);