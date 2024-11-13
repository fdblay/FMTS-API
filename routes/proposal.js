import { Router } from "express";
import { createProposal, deleteProposal, downloadProposalPDF, getProposal, getProposals, updateProposal } from "../controllers/proposal.js";

const proposalRouter = Router();

proposalRouter.post('/proposals', createProposal);

proposalRouter.get('/proposals', getProposals);

proposalRouter.get('proposals/:id', getProposal);

proposalRouter.patch('/proposals/:id', updateProposal);

proposalRouter.delete('/proposals/:id', deleteProposal);

proposalRouter.get('/proposals/:id/download', downloadProposalPDF);


export default proposalRouter;
