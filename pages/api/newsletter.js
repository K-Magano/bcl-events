import { connectDatabase, insertDocument } from "@/helpers/db-util";

async function handler(request, response) {
  if (request.method === "POST") {
    const userEmail = request.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      response
        .status(422)
        .json({ message: "Invalid email address, coming from newsletter.js" });
      return;
    }

    let client;
    //Connecting with MongoDB
    try {
      const client = await connectDatabase();
    } catch (error) {
      response.status(500).json({ message: "Connecting to MongoBD Failed." });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      response.status(500).json({ message: "Inserting Data Failed." });
      return;
    }

    response.status(201).json({ message: "Signed up! from newsletter" });
  }
}

export default handler;
