import { TaskModel } from "../models/task.js";
import { addTaskValidator, updateTaskStatusValidator, updateTimeLogValidator } from "../validators/task.js";


// Create new Task
export const addTask = async (req, res, next) => {
    try {
        const { error, value } = addTaskValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const task = (await TaskModel.create(value));

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}
// Update Task
export const updateTaskStatus = async (req, res, next) => {
    try {
        const { error, value } = updateTaskStatusValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const task = await TaskModel.findByIdAndUpdate(req.params.id, { value }, { new: true });

        res.status(200).json('Task updated successfully');
    } catch (error) {
        next(error)
    }
}

// Update Time log
export const updateTimeLog = async (req, res, next) => {
    try {
        const { error, value } = updateTimeLogValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const task = await TaskModel.findById(req.params.id);

        task.hoursLogged += value.hoursLogged;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}

// Get a Task
export const getTasks = async (req, res, next) => {
    try {
        const {
            filter = "{}", sort = "{}", limit = 0, skip = 0
        } = req.query;

        // Fetch task from database
        const task = await TaskModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
            .populate('createdBy', 'fullName');

        // Return response
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}
// Get a Task

// Delete a Task