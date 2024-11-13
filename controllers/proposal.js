import PDFDocument from 'pdfkit';
import { ProposalModel } from "../models/proposal";
import { addProposalValidator, updateProposalValidator } from "../validators/proposal";


export const createProposal = async (req, res, next) => {
    try {
        const { error, value } = addProposalValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const proposal = await ProposalModel.create(value);

        res.status(201).json(proposal);
    } catch (error) {
        next(error);
    }
}

export const getProposal = async (req, res, next) => {
    try {
        const proposal = await ProposalModel.findById(req.params.id);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        res.status(200).json(proposal);
    } catch (error) {
        next(error);
    }
}

export const getProposals = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        const proposal = await ProposalModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
        res.status(200).json(proposal)
    } catch (error) {
        next(error)
    }
}

export const updateProposal = async (req, res, next) => {
    try {
        const { error, value } = updateProposalValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }

        const proposal = await ProposalModel.findByIdAndUpdate(req.params.id, value);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        res.status(200).json({ message: 'Proposal updatedF sucessfully' });
    } catch (error) {
        next(error);
    }
}

export const deleteProposal = async (req, res, next) => {
    try {
        const proposal = await ProposalModel.findByIdAndDelete(req.params.id);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        res.status(200).json({ message: 'Proposal deleted sucessfully' });

    } catch (error) {
        next(error);
    }
}


//Generate PDF for a proposal
export const downloadProposalPDF = async (req, res, next) => {
try {
        const proposal = await ProposalModel.findById(req.params.id)
        .populate('createdBy', 'fullName')
        .populate('projectId', 'projectName');

        if (!proposal) {
            return res.status(404).json({message: 'Proposal not found'});
        }

        const doc = new PDFDocument();
        res.setHeader('Content-Disposition', 'attachment; filename="proposal.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);

        // PDF Content
        doc.fontSize(20).text('Project Proposal', {align: 'center'});
        doc.moveDown();
        doc.fontSize(14).text(`Title: ${proposal.title}`);
        doc.text(`Description: ${proposal.details}`);
        doc.text(`Project: ${proposal.projectId.title}`);
        doc.text(`Created by: ${proposal.createdBy.fullName}`);
        // doc.text(`Status: ${proposal.status}`);
        doc.moveDown();

        if (proposal.attachments.length) {
            doc.fontSize(16).text('Attachments:', {underline: true});
            proposal.attachments.forEach((attachment, index) => {
                doc.fontSize(12).text(`${index + 1}.${attachment.filename} - ${attachment.url}`);
            });
            doc.moveDown();
        }

        // if (proposal.comments.length) {
        //     doc.fontSize(16).text('')
        // }
        doc.end();
    
} catch (error) {
    next(error);
}} 

