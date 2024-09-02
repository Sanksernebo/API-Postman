const app = require('./app');
const port = 3000;

// run server with: node server.js
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});