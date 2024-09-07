import wrapAsync from "../Utils/wrapAsync.js";
import gptGenerateProposal from "../Config/GPT.Config.js";
import formatProposalContent from "../Utils/gptResponseFormatter.js";
import ApiResponse from "../Utils/ApiResponse.js";
import Proposal from "../Models/Proposal.Model.js";

export const generateProposal = wrapAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const uid = req.user?.id;

  // gptGenerateProposal(prompt)
  const proposal = await gptGenerateProposal(
    `client name : ( ${name} ) and client project description :  ${description} please write proposal for it`
  );

  const formattedContent = formatProposalContent(proposal);

  // TODO : save proposal in db for history tracking
  const newProposal = await Proposal.create({
    name,
    description,
    uid,
    content: formattedContent,
  });

  console.log("newProposal Content : ", newProposal);
  console.log("formattedContent Content : ", formattedContent);

  res.status(200).json(new ApiResponse(true, "Project Proposal", newProposal));
});

export const getProposalByUserId = wrapAsync(async (req, res, next) => {
  const uid = req.user?.id;
  const proposals = await Proposal.find({ uid });

  res.status(200).json(new ApiResponse(true, "User Proposals", proposals));
});
