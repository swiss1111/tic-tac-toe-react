# tic-tac-toe

This template should help get you started developing with Vue 3 in Vite.

- The game starts with a 3x3 empty board.
- The game is played by two human players.
- Players are represented by an X or O sign.
- Players can place their signs on an empty board cell after each other.
- The winner is the player who can place three of its signs next to each other
  diagonally, horizontally, or vertically.
- When no empty cells are left, and there is no winner, the game ends in a draw.

## Tasks
### Project skeleton
Create the skeleton of the application using your chosen framework/library.
### Game logic
Create the game logic based on the rules outlined above. When one of the players won or
the game ends in a draw, display the result of the game, and allow starting a new game.
### Saving the board
Players can save the game board at any time, except when it’s empty. Use the correct API
endpoint to save boards. To save a board you have to name it. Use a form to get the board
name from the user.
### Pages
Create navigation between pages. Other than the page where you play the game, the
application should have another page, where the saved games are listed. On this page, the
users can view, delete, and load the game saves. Use the correct API endpoints for these
CRUD operations. When the user loads a saved game, the application should navigate to
the game page with the board in the state it was saved.
### Filtering
Add filtering to the page where the saved games are listed. With the listing API, you can filter
in the names of the saved games.
### Testing
Add unit tests where you think it’s necessary.
### Design
You can implement your own design. You can use any CSS framework, or just create
everything yourself.

## Optional tasks
### Bigger board
The user can change the size of the game board before each game. Size can be 4x4, 5x5,
6x6, 7x7.
On a 4x4 and bigger boards, the player who can place 4 of its signs wins next to each
other.
The page where you list the saved games can display the bigger boards and they can
be loaded and deleted as well.
### AI
The game can be played by two human players, or one human player and an AI player. You
can get the next AI move by using the correct API endpoint.
Responsive design
The application should be responsive. Pages should be usable on small screen sizes too, as
well as on desktop.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Backend application and API documentation
To run the backend application you need to install the docker engine and docker-compose.
You can find instructions here:

https://docs.docker.com/engine/install/

https://docs.docker.com/compose/install/

Create a docker-compose.yml file in the root directory of your project, with docker-compose.yml file in root library

```
version: "3.7"

services:
  tic-tac-toe-backend:
    image: precognoxkft/tic-tac-toe-backend:1.0.0
    container_name: tic-tac-toe-backend
    ports:
      - "5000:5000"
    environment:
      - POSTGRES_HOST=postgres
      - POSTGRES_PORT=5432
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin
      - POSTGRES_DB=nestjs
      - PORT=5000
    networks:
      - tic-tac-toe-network
    depends_on:
      - postgres

  postgres:
    image: postgres:latest
    container_name: postgres
    ports:
      - "5432:5432"
    volumes:
      - ./data/postgres:/data/postgres
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin
      - POSTGRES_DB=nestjs
    networks:
      - tic-tac-toe-network

networks:
  tic-tac-toe-network:
    driver: bridge
```

Then in the same root directory, run the following command:

```sh
docker-compose up
```

The backend application will start up and will be available on http://localhost:5000. The API
documentation is available at http://localhost:5000/api-docs/. Here you can find all the
necessary API endpoints to complete the test.

You can stop the running backend application with the following command:

```sh
docker-compose stop
```

You can remove the backend container if you don’t need it anymore with the following
command:

```sh
docker-compose down
```

You can remove the backend image too if you don’t need it anymore with the following
command:

```sh
docker image rm precognoxkft/tic-tac-toe-backend:1.0.0 postgres:latest
```