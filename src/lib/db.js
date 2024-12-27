import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("LoveSender"); // select database

//////////////////////////////////////////
// Movies
//////////////////////////////////////////

// Get all movies
async function getMemories() {
  let memories = [];
  try {
    const collection = db.collection("memories");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    memories = await collection.find(query).toArray();
    memories.forEach((memory) => {
      memory._id = memory._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return memories;
}

// Get movie by id
async function getMemory(id) {
  let memory = null;
  try {
    const collection = db.collection("memories");
    const query = { _id: new ObjectId(id) }; // filter by id
    memory = await collection.findOne(query);

    if (!memory) {
      console.log("No memory with id " + id);
      // TODO: errorhandling
    } else {
      memory._id = memory._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return memory;
}

// create movie
// Example movie object:
/* 
{ 
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten"
} 
*/
async function createMemory(memory) {
  memory.image = "/images/placeholder.jpg"; // default poster
  memory.memory = false;
  try {
    const collection = db.collection("memories");
    const result = await collection.insertOne(memory);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// update movie
// Example movie object:
/* 
{ 
  _id: "6630e72c95e12055f661ff13",
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten",
  actors: [
    "Lena Herzog",
    "Maximilian Schröder",
    "Sophia Neumann"
  ],
  poster: "/images/Altura.png",
  watchlist: false
} 
*/
// returns: id of the updated movie or null, if movie could not be updated
async function updateMemory(memory) {
  try {
    let id = memory._id;
    delete memory._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("memories");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: memory });

    if (result.matchedCount === 0) {
      console.log("No memory with id " + id);
      // TODO: errorhandling
    } else {
      console.log("Memory with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// delete movie by id
// returns: id of the deleted movie or null, if movie could not be deleted
async function deleteMemory(id) {
  try {
    const collection = db.collection("memories");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No memory with id " + id);
    } else {
      console.log("Memory with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// export all functions so that they can be used in other files
export default {
  getMemories,
  getMemory,
  createMemory,
  updateMemory,
  deleteMemory,
};
