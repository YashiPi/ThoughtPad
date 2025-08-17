import express from "express";
import {
  createNote,
  getNoteById,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:hello", updateNote);
// https://localhost:5001/api/notes/2341
router.delete("/:id", deleteNote);

export default router;
