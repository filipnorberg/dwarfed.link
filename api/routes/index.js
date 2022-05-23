const express = require('express');
const router = express.Router();
const db = require('../db');



router.post('/links', async function(req, res, next) {
  const shortLinkID = await db.getShortLinkID(req.body.orgLink);
  return res.json({ shortLinkID });
});

module.exports = router;
