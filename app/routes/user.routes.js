module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new note
    app.post('/user', users.create);

    // user login
    app.post('/userlogin', users.userlogin);

    // Retrieve all notes
    app.get('/users', users.findAll);

    // Retrieve a single note with noteId
    app.get('/user/:mailId', users.findOne);

    // Update a note with noteId
    app.put('/user/:mailId', users.update);

    // Delete a note with noteId
    app.delete('/user/:mailId', users.delete);
}
