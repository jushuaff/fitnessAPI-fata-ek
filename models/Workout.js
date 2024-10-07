const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: [true, 'User ID is Required']
    },
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    duration: {
        type: String,
        required: [true, 'duration is Required']
    },
    status: {
        type: String,
        default: 'pending'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workout', workoutSchema);