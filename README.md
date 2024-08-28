# music-list

Rest API CRUD (Create, Read, Update, Delete) in JavaScript using modern technologies like jsonserver to consume an API in real-time.

The application is a list of movies where you can:

Add a new movie
Read existing movies.
Update information about a movie.

Project structure
The project is organized as follows:

API-CRUD/
│
├── node_modules/ # Project dependencies
├── server/
│ └── db.json # File containing the fake database (fake API)
├── src/
│ ├── services.js # JavaScript file with CRUD functions
│ └── style.css # CSS styles for the application
├── .gitignore # File to ignore certain files/directories in Git
├── index.html # Main page of the application
├── package-lock.json # Dependency lock file (generated automatically)
└── package.json # Project configuration file and dependencies

Prerequisites
Node.js installed on your machine.
Basic familiarity with JavaScript, HTML, and CSS.
Installation
To get started with the project, follow these steps:

1. Clone the repository:

git clone https://github.com/juamrm/music-list
cd music-list 2. Install the dependencies:

npm install 3. Start the json-server:

npm run apiFake
This will start a server on your local host that will serve as our mock API.

4. Open the index.html file:

You can open index.html in your browser to see the application in action.
