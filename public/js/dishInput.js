// Get the dish type select box, dish name input, ingredients input, and recipe input
const dishTypeSelect = document.querySelector("#dish_type");
const dishNameInput = document.querySelector("input[name='dish_name']");
const ingredientsInput = document.querySelector("input[name='ingredients']");
const recipeInput = document.querySelector("input[name='recipe']");

// Populate the dish type select box with data from the server
fetch("/api/dish/dish_type")
  .then((response) => response.json())
  .then((types) => {
    // Loop over the types array and create an option element for each type
    types.forEach((typeObj) => {
      const option = document.createElement("option");
      option.textContent = typeObj.dish_type;
      option.value = typeObj.dish_type;
      dishTypeSelect.appendChild(option);
    });
  })
  .catch((err) => console.error(err));

// When the form is submitted, create a new dish
const form = document.querySelector("#dish-form");
form.addEventListener("submit", async (event) => {
  //event.preventDefault();

const dish = {} 
dish['dish_name'] = dishNameInput.value
dish.ingredients = ingredientsInput.value
dish.recipe = recipeInput.value
dish['dish_type'] = dishTypeSelect.value
console.log(dish);
  try {
    const response = await fetch("/api/dish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( dish)
      // body: JSON.stringify({
      //   dish_name: dishName,
      //   ingredients: ingredients,
      //   recipe: recipe,
      //   dish_type: dishType,
      // }),
    });

    if (response.status === 201) {
      alert("Dish created successfully");
    } else {
      throw new Error("Failed to create dish");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to create dish");
  }
});