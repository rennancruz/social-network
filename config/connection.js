const { connect, connection } = require("mongoose");

// MongoDB connection string
const connectionString = 'mongodb+srv://dbUser:dbUserPassword@cluster0.86ovs.mongodb.net/';

// Connect to MongoDB
connect(connectionString);

// Export the connection for use in the app
module.exports = connection;
