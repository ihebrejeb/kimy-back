//twilio with config
const {
  jwt: { AccessToken },
} = require("twilio");

const VideoGrant = AccessToken.VideoGrant;
const MAX_ALLOWED_SESSION_DURATION = 14400;
const express = require("express");
const router = express.Router();

router.route("/token").post(function (request, response) {
  const { identity, room } = request.body;
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { ttl: MAX_ALLOWED_SESSION_DURATION }
  );

  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  const grant = new VideoGrant({ room });
  token.addGrant(grant);

  // Serialize the token to a JWT string.
  response.send(JSON.stringify({ token: token.toJwt() }));
});
module.exports = router;
