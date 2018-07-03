const mongoose = require('mongoose');

const HackathonSchema = mongoose.Schema({
    name: String,
    summary: String,
    conductedBy: String,
    startDate: String,
    endDate: String,
    active: String,
    rules:  { type: String, trim: true },
    leaderBoard: { type: String, trim: true },
    contact: { type: String, trim: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hackathon', HackathonSchema);
