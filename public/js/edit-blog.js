const blogId = document.querySelector('input[name="blog-id"]').value;

console.log(blogId);

const editFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('failed to edit post');
    }
  }
};

const deletePost = async (event) => {
  event.preventDefault();
  const response = await fetch(`/api/blogs/${blogId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('failed to delete post');
  }
};

document
  .querySelector('.edit-blog')
  .addEventListener('submit', editFormHandler);
document.querySelector('#delete-btn').addEventListener('click', deletePost);