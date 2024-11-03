import { toJSON } from "@reis/mongoose-to-json";
import { Schema } from "mongoose";

const projectSchema = new Schema({
    projectName: {
        type: String,
        require: true
    },
    projectBrief: {
        type: String,
        require: true
    },
    projectAssignee: {
        type: String,
        require: true
    },
    projectStatus: {
        type: String,
        require: true,
        enum: ['Open', 'In Progress', 'Review', 'Completed', 'Closed']
    },
}, {
    timestamps: true
});

projectSchema.plugin(toJSON);

export const ProjectModel = model('Project', projectSchema);