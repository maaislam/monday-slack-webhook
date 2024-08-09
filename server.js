const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Slack Webhook URL (replace with your actual webhook URL)
const slackWebhookUrl = 'https://hooks.slack.com/triggers/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';

// Define sources based on subscriptionId
const sources = {
  34953252: 'Luxury Flooring',
  // Add more subscriptionId mappings here
  12345678: 'Another Source',
  87654321: 'Yet Another Source',
};

app.post('/', (req, res) => {
  const data = req.body.event;

  // Construct the URL
  const url = `https://convertex-digital-team.monday.com/boards/${data.boardId}/pulses/${data.pulseId}`;

  // Determine the source based on subscriptionId
  const source = sources[data.subscriptionId] || 'Unknown Source';

  const slackMessage = {
    source: source,
    message: data.textBody,
    url: url,
  };
  console.log('🚀 ~ app.post ~ slackMessage:', slackMessage);

  axios
    .post(slackWebhookUrl, slackMessage)
    .then((response) => {
      console.log('Message sent to Slack successfully:', response.data);
      res.status(200).send(req.body);
    })
    .catch((error) => {
      console.error('Error sending message to Slack:', error);
      res.status(500).send('Error sending message to Slack');
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
