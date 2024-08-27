// Get references to DOM elements
const listTag = document.getElementById("list");
const taskInput = document.getElementById("newTask");
const API_URL = "http://localhost:3000/movies";

// Fetch and display movies
async function getMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Print the list of movies
async function printMovies() {
  const movies = await getMovies();
  if (movies && movies.length > 0) {
    movies.map((movie) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `${movie.title} <button class="delete-button" onclick="deleteMovie('${movie.id}')">Delete</button>`;
      listTag.appendChild(listItem);
    });
  }
}

// Add a new movie

async function addMovie() {
  const newMovieTitle = taskInput.value.trim();
  if (newMovieTitle) {
    const newMovie = { title: newMovieTitle };
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      taskInput.value = ""; // Clear the input field
      printMovies(); // Refresh the list
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  } else {
    alert("Please enter a movie title");
  }
}

printMovies();

// Delete a movie

async function deleteMovie(id) {
  if (confirm("Are you sure you want to delete this movie?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      printMovies(); // Refresh the list
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  }
}
// update the list?

//passar pelo id
//criar um metodo q passe pelo id
