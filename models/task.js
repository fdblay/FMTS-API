import { Schema, Types, model } from "mongoose";

const taskSchema = new Schema({
    title: {type: String, required: true},

    description: {type: String},

    createdBy: {type: Types.ObjectId, ref: 'User', required: true},

    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },

    hoursLogged: {type: Number, default: 0}
}, {
    timestamps: true
});

export const TaskModel = model('Task', taskSchema);