const { MongoClient } = require("mongodb");
const Chance = require('chance');

require('dotenv').config();


const client = new MongoClient(process.env.MONGODB_URL);

const chance = new Chance();


async function getShortLinkID(orgLink) {
  try {
    await client.connect();
    const database = client.db('linkshortener');
    const links = database.collection('links');
    const query = { orgLink: orgLink };
    const link = await links.findOne(query);

    if (link == null) {
      const newShortID = chance.string({ length: 6, pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"});
      await links.insertOne(
        { orgLink: orgLink, shortLinkID: newShortID }
      );
      return newShortID;
    } else {
      return link.shortLinkID;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


async function getOriginalLink(shortLinkID) {
  try {
    await client.connect();
    const database = client.db('linkshortener');
    const links = database.collection('links');
    const query = { shortLinkID: shortLinkID };
    const link = await links.findOne(query);

    return link.orgLink;
  } finally {
    await client.close();
  }
}


module.exports = { getShortLinkID, getOriginalLink }