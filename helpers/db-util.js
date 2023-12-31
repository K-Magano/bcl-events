import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    // "mongodb+srv://Keorapetse:CEhWHLDNsIZR7d5q@cluster0.mgsfrhf.mongodb.net/events?retryWrites=true&w=majority"
    "mongodb+srv://Keorapetse:4PpO5eBtTPA51RF2@cluster0.mgsfrhf.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  //filter out documents.
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
