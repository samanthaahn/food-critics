$(document).ready(() => {
    const ingredientsDropdown = $("#ingredients-dropdown");
    const recipeDropdown = $("#recipe-dropdown");
  
    // Populate the ingredients and recipe dropdowns with data from the server
    fetch("/api/dish/simple")
      .then((response) => response.json())
      .then((dishes) => {
        // Loop over the dishes array and create an option element for each ingredient and recipe
        const ingredientsSet = new Set();
        const recipeSet = new Set();
        dishes.forEach((dish) => {
          dish.ingredients.split(",").forEach((ingredient) => {
            ingredientsSet.add(ingredient.trim());
          });
          recipeSet.add(dish.recipe.trim());
        });
  
        ingredientsSet.forEach((ingredient) => {
          const option = $("<option>").text(ingredient).val(ingredient);
          ingredientsDropdown.append(option);
        });
  
        recipeSet.forEach((recipe) => {
          const option = $("<option>").text(recipe).val(recipe);
          recipeDropdown.append(option);
        });
      })
      .catch((err) => console.error(err));
  
    // When the review form is submitted, create a new review
    const form = $("#review-form");
    form.submit((event) => {
      event.preventDefault();
  
      const stars = $("#stars").val();
      const review = $("#review").val();
      const ingredients = ingredientsDropdown.val();
      const recipe = recipeDropdown.val();
  
      try {
        const response = await fetch("/api/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stars: stars,
            comment: review,
            dish_id: null, 
          }),
        });
  
        if (response.status === 201) {
          alert("Review created successfully");
        } else {
          throw new Error("Failed to create review");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to create review");
      }
    });
  });