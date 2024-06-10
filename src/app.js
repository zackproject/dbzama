const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Use the PORT from environment variables if available
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));

app.use('/character',require('./routes/character'));

// 404 error handler
app.use((req, res, next) => {
  console.log(process.env.TURSO_DATABASE_URL);
  res.status(404).sendFile(__dirname + "/public/404.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
