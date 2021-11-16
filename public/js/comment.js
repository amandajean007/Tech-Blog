const commentFormHandler = async (event) => {
  event.preventDefault();

  const blogId = document.querySelector('input[name="blog-id"]').value;
  const details = document.querySelector('#comment-details').value.trim();

  if (details) {
    const response = await fetch(`/api/blogs/${blogId}/comment`, {
      method: 'PUT',
      body: JSON.stringify({
        details,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('failed to add comment');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);