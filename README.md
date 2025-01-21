# Social Network

This is a simple backend application for a social network. It allows users to share thoughts, react to thoughts, and manage their friend lists. The project uses **MongoDB** as the database and **Mongoose** as the Object Data Modeling (ODM) library.

## Features

- Users can:
  - Create, update, and delete accounts.
  - Add and remove friends.
  - View all users or a specific user (including their thoughts and friend list).

- Thoughts:
  - Users can create, update, and delete thoughts.
  - Thoughts can have reactions (similar to comments), which can also be added or removed.

## Demo
https://github.com/user-attachments/assets/a519488c-a0a7-463a-96d7-27f5541f57ef

## Technologies Used

- **MongoDB** (Database)
- **Mongoose** (ODM library)
- **Express.js** (Web framework for Node.js)
- **Node.js**

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- MongoDB (local or cloud-based, e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/rennancruz/social-network
   ```

2. Navigate to the project folder:
   ```bash
   cd social-network
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/socialNetworkAPI?retryWrites=true&w=majority
   PORT=3001
   ```

### Running the Application

1. Seed the database with sample data:
   ```bash
   npm run seed
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Use a tool like [Insomnia](https://insomnia.rest/) to test the API.

## API Routes

### Users
- `GET /api/users` - Get all users.
- `GET /api/users/:userId` - Get a single user by ID.
- `POST /api/users` - Create a new user.
- `PUT /api/users/:userId` - Update a user by ID.
- `DELETE /api/users/:userId` - Delete a user by ID.
- `POST /api/users/:userId/friends/:friendId` - Add a friend.
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend.

### Thoughts
- `GET /api/thoughts` - Get all thoughts.
- `GET /api/thoughts/:thoughtId` - Get a single thought by ID.
- `POST /api/thoughts` - Create a new thought.
- `PUT /api/thoughts/:thoughtId` - Update a thought by ID.
- `DELETE /api/thoughts/:thoughtId` - Delete a thought by ID.

### Reactions
- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction by ID.

## Submission Requirements

1. Include a walkthrough video demonstrating the functionality of the API:
   - Starting the server.
   - Testing all CRUD operations for users and thoughts.
   - Adding/removing friends and reactions.
2. Submit the video link and a link to this repository.

## License

This project is licensed under the MIT License.
