const { nanoid } = require('nanoid');
const notes = require('./notes');

const handlerAddNotes = (request, h) => {
  const { title, tags, body } = request.payload;

  // nanoid bergunfsi sebagai pemberi nilai unik pada atiburt id
  const id = nanoid(16);

  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  // measukan data ke dalam array notes

  const newNote = {
    title, tags, body, id, createdAt, updateAt,
  };

  notes.push(newNote);

  // cek notes if successfull aded

  const isSuccess = notes.filter((note) => note.id === id.length > 0);

  // mengembalikan respon
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      meesage: 'Catatan sucessfull created',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  // jika gagal
  const response = h.response({
    status: 'fail',
    message: 'Catatan failed to created',
  });
  response.code(500);
  return response;
};

const handlerGETAllNotes = () => ({
  status: 'success',
  data: {
    notes,
  },

});

const handlerGetNoteByID = (request, h) => {
  // get id
  const { id } = request.params;

  // filter note by id
  const note = notes.filter((n) => n.id === id)[0];

  // cek if note ada
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  // jika notes by id tidka ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const handlerUpdateNote = (request, h) => {
  // request id
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  // find index
  const index = notes.findIndex((note) => note.id === id);

  // cek if successful get index
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      message: 'update success!',
    });
    response.code(200);
    return response;
  }

  // if failed to get index
  const response = h.response({
    status: 'fail',
    message: 'failed to update note!, cant find id notes!',
  });
  response.code(404);
  return response;
};

const handlerDeleteNote = (request, h) => {
  // get id
  const { id } = request.params;

  // find index
  const index = notes.findIndex((note) => note.id === id);

  // cek if find index success
  if (index !== -1) {
    // delete notes
    notes.splice(index, 1);
    // give response success delete
    const response = h.response({
      status: 'success',
      message: 'Note successfully deleted',
    });
    response.code(200);
    return response;
  }

  // if cant find index
  const response = h.response({
    status: 'failed',
    message: 'note failed to delete',
  });
  response.code(404);
  return response;
};

module.exports = {
  handlerAddNotes,
  handlerGETAllNotes,
  handlerGetNoteByID,
  handlerUpdateNote,
  handlerDeleteNote,
};
