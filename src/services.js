// Get references to DOM elements
const listTag = document.getElementById("list");
const taskInput = document.getElementById("newTask");
const movieIdInput = document.getElementById("movieId");
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
  listTag.innerHTML = ""; // Clear the list before reprinting
  if (movies && movies.length > 0) {
    movies.map((movie) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        ${movie.title} 
        <button class="edit-button" onclick="editMovie('${movie.id}', '${movie.title}')">Edit</button>
        <button class="delete-button" onclick="deleteMovie('${movie.id}')">Delete</button>`;
      listTag.appendChild(listItem);
    });
  }
}

// Add or update a movie
async function submitForm(event) {
  event.preventDefault();
  const movieTitle = taskInput.value.trim();
  const movieId = movieIdInput.value;

  if (movieTitle) {
    const movieData = { title: movieTitle };

    try {
      const response = await fetch(`${API_URL}/${movieId || ""}`, {
        //reuse funtion for post update
        method: movieId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${movieId ? "update" : "add"} movie`);
      }

      taskInput.value = ""; // Clear the input field
      movieIdInput.value = ""; // Clear the hidden ID field
      printMovies(); // Refresh the list
    } catch (error) {
      console.error(`Error ${movieId ? "updating" : "adding"} movie:`, error);
    }
  } else {
    alert("Please enter a movie title");
  }
}

// Edit a movie (pre-fill the form for updating)
function editMovie(id, title) {
  movieIdInput.value = id;
  taskInput.value = title;
  taskInput.focus();
}

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

// Initialize the movie list
printMovies();
