import Note from "../models/Note.js";

// arrow function or function
export async function getAllNotes(req, res) {
  try {
    // .find() is a method of Mongoose that retrieves all documents from the specified collection.
    // Note is the model we created based on the Note schema
    // It returns a promise that resolves to an array of Note documents.
    const notes = await Note.find().sort({ createdAt: 1 }); // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // res.status(200).send("You just fetched the notes");
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
    // return note;
  } catch (error) {
    console.error("Error in getNoteById controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    // console.log("Received data:", { title, content });
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    // why is it making a new note?
    // req.params.hello is used to access the URL parameter named "hello"
    // in the route definition. It should match the parameter name in the route.
    // For example, if the route is defined as "/api/notes/:hello",
    // then req.params.hello will contain the value of that parameter.
    // If you want to update a note by its ID, you should use req.params.id
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.hello,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found to delete" });
    }
    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    console.error("Error in deleteNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
