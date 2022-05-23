const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/:id', async function(req, res, next) {
  console.log(req.params.id);
  const orgLink = await db.getOriginalLink(req.params.id);
  return res.redirect(orgLink);
});

router.post('/links', async function(req, res, next) {
  const shortLinkID = await db.getShortLinkID(req.body.orgLink);
  return res.json({ shortLinkID });
});

module.exports = router;
