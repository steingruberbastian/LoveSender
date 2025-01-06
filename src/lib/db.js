import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
// Setzt die Datenbank
const db = client.db("LoveSender");

// Bekommt ein Array mit allen Memories
async function getMemories() {
  let memories = [];
  try {
    const collection = db.collection("memories");
    const query = {};

    memories = await collection.find(query).toArray();
    memories.forEach((memory) => {
      memory._id = memory._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return memories;
}

// Bekommt eine Memory über die ID
async function getMemory(id) {
  let memory = null;
  try {
    const collection = db.collection("memories");
    const query = { _id: new ObjectId(id) };
    memory = await collection.findOne(query);

    if (!memory) {
      console.log("No memory with id " + id);
    } else {
      memory._id = memory._id.toString();
    }
  } catch (error) {
    console.log(error.message);
  }
  return memory;
}

// Erstellt eine neue Memory
async function createMemory(memory) {
  try {
    const collection = db.collection("memories");
    const result = await collection.insertOne(memory);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Passt eine Memory an
async function updateMemory(memory) {
  try {
    let id = memory._id;
    delete memory._id;
    const collection = db.collection("memories");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: memory });

    if (result.matchedCount === 0) {
      console.log("No memory with id " + id);
    } else {
      console.log("Memory with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Löscht eine Memory über die ID
async function deleteMemory(id) {
  try {
    const collection = db.collection("memories");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No memory with id " + id);
    } else {
      console.log("Memory with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Bekommt alle Kategorien
async function getCategories() {
  let categories = [];
  try {
    const collection = db.collection("categories");
    const query = {};

    // Bekommt alle Objekte, die der Query entsprechen
    categories = await collection.find(query).toArray();
    categories.forEach((category) => {
      category._id = category._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return categories;
}

// Bekommt die Memories einer Kategorie
async function getMemoriesByCategory(category_id) {
  let memories = [];
  try {
    // Erst die Kategory holen um seine ID zu bekommen
    const category = await db.collection("categories").findOne({ 
      _id: new ObjectId(category_id) 
    });
    
    if (category) {
      // Mit der ID nach Memories suchen
      const collection = db.collection("memories");
      const query = { category_id: category.id };
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

// Bekommt die Kategorie von einer Memory
async function getCategoryByMemory(memory_id) {
  console.log("Get category for memory with id " + memory_id);
  let category = null;
  try {
    const memoriesCollection = db.collection("memories");
    const categoriesCollection = db.collection("categories");

    // Findet die Memory mit der memory_id
    const memoryQuery = { _id: new ObjectId(memory_id) };
    const memory = await memoriesCollection.findOne(memoryQuery);

    if (!memory) {
      console.log("No memory with id " + memory_id);
      return null;
    }

    // Bekommt die category_id aus dem Memory
    const category_id = memory.category_id;

    // Findet die Kategorie mit der category_id
    const categoryQuery = { id: category_id };
    const result = await categoriesCollection.findOne(categoryQuery);

    if (!result) {
      console.log("No category with id " + category_id);
    } else {
      category = result.category;
    }
  } catch (error) {
    console.log(error.message);
  }
  return category;
}

// Bekommt die Anzahl der verfügbaren Credits
async function getCredit() {
  let credit;
  try {
    const collection = db.collection("credits");
    const query = {};

    // Findet das erste Objekt, welches der Query entspricht
    credit = await collection.findOne(query);
    if (credit) {
      credit._id = credit._id.toString();
    }

  } catch (error) {
    console.log(error);
  }
  return credit;
}

// Reduziert den ersten Eintrag um 1
async function decrementCredit() {
  let result;
  console.log("Decrement credit of the first entry");
  try {
    const collection = db.collection("credits");

    // Findet das erste Objekt, welches der Query entspricht
    const firstCredit = await collection.findOne({});

    if (firstCredit) {
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
  }
  return result;
}

// Exportiert alle Funktionen
export default {
  getMemories,
  getMemory,
  createMemory,
  updateMemory,
  deleteMemory,
  getCategories,
  getMemoriesByCategory,
  getCategoryByMemory,
  getCredit,
  decrementCredit
};