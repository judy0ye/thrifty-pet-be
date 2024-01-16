import { Router } from "express";
import controller from '../controllers/note'

const router = Router()

router.post('/', controller.createNote);
router.get('/', controller.getAllNotes);
router.get('/:noteId', controller.getNoteById);
router.patch('/:noteId', controller.updateNote);
router.delete('/:noteId', controller.deleteNote);

export default router