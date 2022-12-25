const {
  handlerAddNotes,
  handlerGETAllNotes,
  handlerGetNoteByID,
  handlerUpdateNote,
  handlerDeleteNote,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: handlerAddNotes,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handlerGETAllNotes,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handlerGetNoteByID,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handlerUpdateNote,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handlerDeleteNote,
  },
];

module.exports = routes;
