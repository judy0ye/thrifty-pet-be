import { Request, Response } from "express";
import NoteModel from "../models/note";

const createNote = async (req: Request, res: Response) => {
  try {
    const { product, description } = req.body;

    const note = new NoteModel({
      product,
      description
    });

    const savedNote = await note.save();
    res.status(201).json({ note: savedNote });
  } catch (error) {
      if (error === 'ValidationError') {
        res.status(422).json({error: error.message})
      } else {
        res.status(500).json({ error });
      }
  }
}

const getAllNotes = async (req: Request, res: Response) => {
  try {
    const allNotes = await NoteModel.find();
    res.status(200).json({ notes: allNotes });
  } catch (error) {
      res.status(500).json({ error });
  }
}

const getNoteById = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;

    const specificNote = await NoteModel.findById(noteId)
    specificNote ? res.status(200).json({ note: specificNote }) : res.status(404).json({ message: 'not found' })
  } catch (error) {
      res.status(500).json({ error });
  }
}

const updateNote = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params

    const note = await NoteModel.findById(noteId)

    if (note) {
      note.set(req.body)

      const updatedNote = await note.save()
      res.status(200).json({note: updatedNote})
    } else {
      res.status(404).json({ message: 'not found'})
    }
  } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(422).json({error: error.message})
      } else {
        res.status(500).json({error})
      }
  }
}

const deleteNote = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params

    const deletedNote = await NoteModel.findByIdAndDelete(noteId)
    deletedNote ? res.status(200).json({message: 'deleted'}) : res.status(404).json({ message: 'not found'})
  } catch(error) {
    res.status(500).json({error})
  }
}

export default {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote
}