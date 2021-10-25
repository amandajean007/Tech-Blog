// New Post
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#post-name').value.trim();
  // const timeAndDate = document.querySelector('#timeAndDate').value.trim();
  const description = document.querySelector('#comment').value.trim();

  if (description) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
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

// Update Post
const updateFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#update-name").value.trim();
  const description = document.querySelector("#update-desc").value.trim();
  const id = event.target.getAttribute("data-blog_id");
  console.log(event.target);
  console.log(id);
  if (name && description) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to update post");
    }
  }
};

// Delete Post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector(".update-form")
  .addEventListener("submit", updateFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('submit', delButtonHandler);