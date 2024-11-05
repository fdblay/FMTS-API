import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },

    projectBrief: {
        type: String,
        required: true
    },

    // projectAssignee: {
    //     type: Types.ObjectId,
    //     // required: true,
    //     ref: 'User',
    //     // default: null
    // },

    projectRequirement: {
        type: [String],
        required: true
    },

    projectStatus: {
        type: String,
        required: true,
        enum: ['Open', 'In Progress', 'Review', 'Completed', 'Closed'],
        default: 'Open'
    },
}, {
    timestamps: true
});

projectSchema.plugin(toJSON);

export const ProjectModel = model('Project', projectSchema);