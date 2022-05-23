const { MongoClient } = require("mongodb");

require('dotenv').config();


const client = new MongoClient(process.env.MONGODB_URL);


async function getShortLinkID(orgLink) {
  try {
    await client.connect();
    const database = client.db('linkshortener');
    const links = database.collection('links');
    const query = { orgLink: orgLink };
    const link = await links.findOne(query);
    return link.shortLinkID;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { getShortLinkID }