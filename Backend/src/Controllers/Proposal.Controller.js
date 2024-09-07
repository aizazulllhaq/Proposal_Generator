import wrapAsync from "../Utils/wrapAsync.js";
import gptGenerateProposal from "../Config/GPT.Config.js";
import formatProposalContent from "../Utils/gptResponseFormatter.js";
import ApiResponse from "../Utils/ApiResponse.js";

export const generateProposal = wrapAsync(async (req, res, next) => {
  const { name, description } = req.body;

  // gptGenerateProposal(prompt)
  const proposal = await gptGenerateProposal(
    `client name : ( ${name} ) and client project description :  ${description} please write proposal for it`
  );

  const formattedContent = formatProposalContent(proposal);

  // TODO : save proposal in db for history tracking

  res.status(200).json(new ApiResponse(true, "Project Proposal", formattedContent));
});
