const { connect, connection } = require("mongoose");

// MongoDB connection string (ensure environment variables for flexibility)
const connectionString = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkAPI";

// Connect to MongoDB
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export the connection for use in the app
module.exports = connection;
