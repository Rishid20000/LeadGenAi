const express = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser");

// const client = new twilio("ACCOUNT_SID", "AUTH_TOKEN");

const app = express();
const PORT = 3000;

// Middleware to parse incoming POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Route to handle incoming calls
app.post("/incoming-call", (req, res) => {
  console.log("Incoming call detected!"); // Log when a call is received

  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say("This call is being recorded."); // Message for the caller
  twiml.record({
    recordingStatusCallback: "/recording-status", // Webhook to handle the recording URL
  });

  res.type("text/xml");
  res.send(twiml.toString());
});

// Route to handle recording status callback
app.post("/recording-status", (req, res) => {
  const recordingUrl = req.body.RecordingUrl; // Twilio sends this URL
  console.log("Recording URL:", recordingUrl);

  // You can save this URL to a database or process it further
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Added missing backticks and fixed syntax
});
