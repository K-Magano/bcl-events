import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@/helpers/db-util";

async function handler(request, response) {
  const eventId = request.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    response.status(500).json({ message: "Connection to db failed" });
    return;
  }

  if (request.method === "POST") {
    //get the comment post
    const { email, name, text } = request.body;
    //add server-side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === " " ||
      !text ||
      text.trim === ""
    ) {
      response
        .status(422) //422 invalid input Server-side Error
        .json({ message: "Invalid email address" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      response
        .status(201)
        .json({ message: "Added comment in [eventId]", comment: newComment });
    } catch (error) {
      response.status(500).json({ message: "Inserting comment failed" });
    }
  }

  if (request.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      response.status(200).json({ comments: documents }); //comments are from input/comments
    } catch (error) {
      response.status(500).json({ message: "Getting comments failed" });
    }
  }

  client.close();
}

export default handler;
