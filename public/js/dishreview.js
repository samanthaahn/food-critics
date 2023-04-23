document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch the list of dishes
    const response = await fetch('/api/dish');
    const dishes = await response.json();

    // Populate the dropdown list
    const dishSelect = document.getElementById('dish_name');
    dishes.forEach((dish) => {
      const option = document.createElement('option');
      option.value = dish.id;
      option.textContent = dish.dish_name;
      dishSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching dishes:', error);
  }

  // Handle form submission
  const reviewForm = document.getElementById('review-form');
  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dishId = document.getElementById('dish_name').value;
    const stars = document.getElementById('stars').value;
    const comment = document.getElementById('review').value;

    try {
      // Submit the review data to the server
      const response = await fetch('/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dish_id: dishId,
          stars,
          date: new Date(),
          comment,
        }),
      });

      

      // Reload the page if the review is submitted successfully
      if (response.ok) {
        alert('Review submitted successfully!');
        location.reload();
      } else {
        const errorData = await response.json();
        alert(`Failed to submit the review: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting the review:', error);
      alert('Failed to submit the review.');
    }
  });
});