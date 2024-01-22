import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    product: { type: String, required: true},
    description: { type: String, required: true}
  },
  {
    versionKey: false
  },
);

const NoteModel = mongoose.models.Note || mongoose.model('Note', NoteSchema)

export default NoteModel