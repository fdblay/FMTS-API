import { ProposalModel } from "../models/proposal";
import { addProposalValidator } from "../validators/proposal";


export const createProposal = async (req, res, next) => {
    try {
        const {error, value} = addProposalValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const proposal = await ProposalModel.create(value);

        res.status(201).json(proposal);
    } catch (error) {
        next(error);
    }
}