const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.mailId) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        mailId: req.body.mailId,
        password: req.body.password,
        name: req.body.name,
        portfolio: req.body.portfolio,
        level: req.body.level,
        admin: req.body.admin
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });

};


// user login
exports.userlogin = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "UserName can not be empty"
        });
    }

    if(!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }

    User.findOne({mailId:req.body.username,
  password:req.body.password})
    .then(user => {
        if(!user) {
            return res.status(200).send({
                message: "User Name and Password is not match"
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.username
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.username
        });
    });

};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a mailId
exports.findOne = (req, res) => {
    User.findById(req.params.mailId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.mailId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.mailId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.mailId
        });
    });
};

// Update a user identified by the mailId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.mailId) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.mailId, {
      mailId: req.body.mailId,
      password: req.body.password,
      name: req.body.name,
      portfolio: req.body.portfolio,
      level: req.body.level,
      admin: req.body.admin
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.mailId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.mailId
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.mailId
        });
    });
};

// Delete a user with the specified mailId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.mailId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.mailId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.mailId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.mailId
        });
    });
};
