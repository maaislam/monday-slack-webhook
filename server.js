const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).send(req.body);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
