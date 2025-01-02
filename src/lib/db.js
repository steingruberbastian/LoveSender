import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("LoveSender"); // select database

//////////////////////////////////////////
// Movies
//////////////////////////////////////////

// Get all memories
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

// Get memory by id
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

// Get all categories
async function getCategories() {
  let categories = [];
  try {
    const collection = db.collection("categories");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    categories = await collection.find(query).toArray();
    categories.forEach((category) => {
      category._id = category._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return categories;
}

async function getMemoriesByCategory(category_id) {
  let memories = [];
  try {
    // Erst die Kategory holen um seine numerische ID zu bekommen
    const category = await db.collection("categories").findOne({ 
      _id: new ObjectId(category_id) 
    });
    
    if (category) {
      // Mit der numerischen ID nach Memories suchen
      const collection = db.collection("memories");
      const query = { category_id: category.id }; // Hier nutzen wir memory.id
      console.log("Suche nach Memories mit query:", query);
      
      memories = await collection.find(query).toArray();
      memories.forEach((memory) => {
        memory._id = memory._id.toString();
      });
    }
  } catch (error) {
    console.log(error);
  }
  return memories;
}

// Get category by memory_id
async function getCategoryByMemory(memory_id) {
  console.log("Get category for memory with id " + memory_id);
  let category = null;
  try {
    const memoriesCollection = db.collection("memories");
    const categoriesCollection = db.collection("categories");

    // Find the memory by _id
    const memoryQuery = { _id: new ObjectId(memory_id) };
    const memory = await memoriesCollection.findOne(memoryQuery);

    if (!memory) {
      console.log("No memory with id " + memory_id);
      // TODO: errorhandling
      return null;
    }

    // Get the category_id from the memory
    const category_id = memory.category_id;

    // Find the category by id
    const categoryQuery = { id: category_id };
    const result = await categoriesCollection.findOne(categoryQuery);

    if (!result) {
      console.log("No category with id " + category_id);
      // TODO: errorhandling
    } else {
      category = result.category; // extract the category attribute
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return category;
}

// Get credit information
async function getCredit() {
  let credit;
  try {
    const collection = db.collection("credits");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get the first object that matches the query
    credit = await collection.findOne(query);
    if (credit) {
      credit._id = credit._id.toString(); // convert ObjectId to String
    }

  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return credit;
}

// Decrement credit number by 1
async function decrementCredit() {
  let result;
  console.log("Decrement credit of the first entry");
  try {
    const collection = db.collection("credits");

    // Find the first document in the collection
    const firstCredit = await collection.findOne({});

    if (firstCredit) {
      // Decrement the number field by 1
      result = await collection.updateOne(
        { _id: firstCredit._id },
        { $inc: { number: -1 } }
      );
    } else {
      console.log("No credit entry found");
      result = { modifiedCount: 0 };
    }

  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return result;
}

// export all functions so that they can be used in other files
export default {
  getMemories,
  getMemory,
  createMemory,
  updateMemory,
  deleteMemory,
  getCategories,
  getCredit, // Ensure getCredit is exported
  decrementCredit // Ensure decrementCredit is exported
};