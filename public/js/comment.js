// New Post
const newCommentHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#comment-name').value.trim();
  // const timeAndDate = document.querySelector('#timeAndDate').value.trim();
  const description = document.querySelector('#comment-desc').value.trim();

  if (body) {
    const response = await fetch(`/api/post?:id/comment`, {
      method: 'POST',
      body: JSON.stringify({ body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create comment');
    }
  }
};

// Delete Post
const delButtonHandler = async (event) => {
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
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);