const express = require('express');
const app = express();
const PORT = 3000;

const moviesRoute = require('./routes/movies');
app.use('/api/v1', moviesRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
