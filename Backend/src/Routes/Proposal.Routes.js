import { Router } from "express";
import {
  generateProposal,
  getProposalByUserId,
} from "../Controllers/Proposal.Controller.js";

const proposalRouter = Router();

// api/v1/proposal

proposalRouter
  .post("/generate-proposal", generateProposal)
  .get("/my", getProposalByUserId);

export default proposalRouter;
