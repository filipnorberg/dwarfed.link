const { MongoClient } = require("mongodb");
require('dotenv').config();


const client = new MongoClient(process.env.MONGODB_URL);


async function run() {
  try {
    await client.connect();
    const database = client.db('linkshortener');
    const movies = database.collection('links');
    const query = { orglink:"https://www.youtube.com/watch?v=eKPxTfa3dk0" };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);