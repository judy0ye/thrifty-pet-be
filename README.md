# Thrifty Pet API

This app is the back-end server for Thrifty Pet FE.

## Getting started

### Installation

1. Clone down this repository at the same level as the frontend repository.
    - `git clone git@github.com:judy0ye/thrifty-pet-be.git`
2. Change into the new directory.
    - `thrifty-pet-be`
3. Install the dependencies.
    - `npm install`
4. Start the server.
    - `nodemon`

### Endpoints

| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `/api/v1/notes/get` | GET | not needed | Object of 'notes' with an Array of all existing notes: `{notes: [ {"_id": "65af4d2e48b4f00056412d29", "product": "Blue Buffalo Dry Food", "description": "My dog loves it"}, {...}, ... ]` |
| `/api/v1/notes/create` | POST | `{product: <String>, description: <String>}` | Add new note: `{note: { "product": "fish snacks", "description": "my cat goes crazy for them" }` |
| `/api/v1/notes/get/:noteId` | GET | not needed | Object of note with single note detail: `{note: {"_id": "65af4d2e48b4f00056412d29", "product": "Blue Buffalo Dry Food", "description": "My dog loves it"}` |
| `/api/v1/notes/update/:noteId` | Patch | `{product: <String>, description: <String>}` | Object of note with single updated note detail: `{note: {"_id": "65af4d2e48b4f00056412d29", "product": "Blue Buffalo Dry Food", "description": "My dog loves it"}` |
| `/api/v1/notes/delete/:noteId` | DELETE | not needed | `{"message":"deleted"}` |

