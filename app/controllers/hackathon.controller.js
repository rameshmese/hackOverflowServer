const Hackathon = require('../models/hackathon.model.js');

// Create and Save a new Hackathon
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "hackathon name can not be empty"
        });
    }

    // Create a Hackathon
    const hackathon = new Hackathon({
        name: req.body.name || "Unnamed hackathon",
        summary: req.body.summary,
        conductedBy: req.body.conductedBy,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        active: req.body.active,
        leaderBoard: JSON.stringify(req.body.leaderBoard),
        contact: JSON.stringify(req.body.contact),
        rules: JSON.stringify(req.body.rules)
    });

    // Save Hackathon in the database
    hackathon.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Hackathon."
        });
    });

};

// Retrieve and return all Hackathons from the database.
exports.findAll = (req, res) => {
    Hackathon.find()
    .then(hackathons => {
        res.send(hackathons);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving hackathons."
        });
    });
};

// Find a single Hackathon with a HackathonId
exports.findOne = (req, res) => {
    Hackathon.findById(req.params.hackathonId)
    .then(hackathon => {
        if(!hackathon) {
            return res.status(404).send({
                message: "Hackathon not found with id " + req.params.hackathonId
            });
        }
        res.send(hackathon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Hackathon not found with id " + req.params.hackathonId
            });
        }
        return res.status(500).send({
            message: "Error retrieving hackathon with id " + req.params.hackathonId
        });
    });
};

// Update a Hackathon identified by the HackathonId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Hackathon name can not be empty"
        });
    }

    // Find Hackathon and update it with the request body
    Hackathon.findByIdAndUpdate(req.params.hackathonId, {
      name: req.body.name,
      summary: req.body.summary,
      conductedBy: req.body.conductedBy,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: req.body.active,
      leaderBoard: JSON.stringify(req.body.leaderBoard),
      contact: JSON.stringify(req.body.contact),
      rules: JSON.stringify(req.body.rules)
    }, {new: true})
    .then(hackathon => {
        if(!hackathon) {
            return res.status(404).send({
                message: "Hackathon not found with id " + req.params.hackathonId
            });
        }
        res.send(hackathon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Hackathon not found with id " + req.params.hackathonId
            });
        }
        return res.status(500).send({
            message: "Error updating hackathon with id " + req.params.hackathonId
        });
    });
};

// Delete a hackathon with the specified hackathonId in the request
exports.delete = (req, res) => {
    Hackathon.findByIdAndRemove(req.params.hackathonId)
    .then(hackathon => {
        if(!hackathon) {
            return res.status(404).send({
hackathonId            });
        }
        res.send({message: "Hackathon deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Hackathon not found with id " + req.params.hackathonId
            });
        }
        return res.status(500).send({
            message: "Could not delete hackathon with id " + req.params.hackathonId
        });
    });
};
