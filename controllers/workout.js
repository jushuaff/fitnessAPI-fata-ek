const Workout = require("../models/workout");

// Add a new workout for the logged-in user
exports.addWorkOut = async (req, res) => {
    console.log(req.user);

    const { name, duration } = req.body;
    const userId = req.user.id;

    if (!name || !duration) {
        return res.status(400).json({ message: "Name and duration are required" });
    }

    try {
        const newWorkout = new Workout({ name, duration, userId });
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error });
    }
};


// Get all workouts for the logged-in user
exports.getMyWorkouts = async (req, res) => {
    const userId = req.user.id; // Logged-in user's ID

    try {
        const workouts = await Workout.find({ userId });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workouts", error });
    }
};

// Update a workout by ID (only if it belongs to the logged-in user)
exports.updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { name, duration, status } = req.body;
    const userId = req.user.id;

    try {
        const workout = await Workout.findOne({ _id: id, userId });
        if (!workout) {
            return res.status(404).json({ message: "Workout not found or access denied" });
        }

        workout.name = name || workout.name;
        workout.duration = duration || workout.duration;
        workout.status = status !== undefined ? status : workout.status;

        await workout.save();
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ message: "Error updating workout", error });
    }
};

// Delete a workout by ID (only if it belongs to the logged-in user)
exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const workout = await Workout.findOne({ _id: id, userId });
        if (!workout) {
            return res.status(404).json({ message: "Workout not found or access denied" });
        }

        await Workout.deleteOne({ _id: id, userId });
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting workout", error });
    }
};

// Complete a workout status by ID (only if it belongs to the logged-in user)
exports.completeWorkoutStatus = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const workout = await Workout.findOne({ _id: id, userId });
        
        if (!workout) {
            return res.status(404).json({ message: "Workout not found or access denied" });
        }

        workout.status = "completed";
        await workout.save(); 

        res.status(200).json({ message: "Workout status updated successfully", workout });
    } catch (error) {
        console.error("Error updating workout status:", error);
        res.status(500).json({ message: "Error updating workout status", error: error.message || error });
    }
};