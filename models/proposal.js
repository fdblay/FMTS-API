import { toJSON } from "@reis/mongoose-to-json";
import { model, Schema, Types } from "mongoose";

const proposalSchema = new Schema({
    title: {type: String, required: true},

    details: {type: String, required: true},

    createdBy: {type: Types.ObjectId, required: true, ref: 'User'},

    projectId: {
        type: Types.ObjectId, required: true, ref: 'Project'
    },

    attachments: [
        {
            filename: {type: String},
            url: {type: String},
            uploadedAt: {type: Date, default: Date.now}
        }
    ],
}, {
    timestamps: true
})

proposalSchema.plugin(toJSON);

export const ProposalModel = model('Proposal', proposalSchema)