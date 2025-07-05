const express = require("express");
const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "BookPinion API is alive!",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
