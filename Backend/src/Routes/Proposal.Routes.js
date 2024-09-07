import { Router } from "express";
import { generateProposal } from "../Controllers/Proposal.Controller.js";

const proposalRouter = Router();

proposalRouter.post("/generate-proposal", generateProposal);

export default proposalRouter;
