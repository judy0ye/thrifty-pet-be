import { Router } from "express";
import controller from '../controllers/note'

const router = Router()

router.post('/create', controller.createNote);
router.get('/get', controller.getAllNotes);
router.get('/get/:noteId', controller.getNoteById);
router.patch('/update/:noteId', controller.updateNote);
router.delete('/delete/:noteId', controller.deleteNote);

export default router