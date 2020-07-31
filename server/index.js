const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client', 'dist')));
// defualt route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

app.listen(port, () =>
  console.log(`Reading Well listening at http://localhost:${port}`)
);
