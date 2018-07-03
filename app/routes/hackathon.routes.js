module.exports = (app) => {
    const hackathons = require('../controllers/hackathon.controller.js');

    // Create a new Note
    app.post('/hackathon', hackathons.create);

    // Retrieve all Notes
    app.get('/hackathons', hackathons.findAll);

    // Retrieve a single Note with noteId
    app.get('/hackathon/:hackathonId', hackathons.findOne);

    // Update a Note with noteId
    app.put('/hackathon/:hackathonId', hackathons.update);

    // Delete a Note with noteId
    app.delete('/hackathon/:hackathonId', hackathons.delete);
}
