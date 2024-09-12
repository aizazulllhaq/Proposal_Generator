import wrapAsync from "../Utils/wrapAsync.js";
import gptGenerateProposal from "../Config/GPT.Config.js";
import ApiResponse from "../Utils/ApiResponse.js";
import Proposal from "../Models/Proposal.Model.js";

export const generateProposal = wrapAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const uid = req.user?.id;

  // gptGenerateProposal(prompt)
  const proposal = await gptGenerateProposal(
    `client name : ( ${name} ) and client project description :  ${description} please write proposal for it`
  );

  // const formattedContent = formatProposalContent(proposal);

  const newProposal = await Proposal.create({
    name,
    description,
    uid,
    content: proposal,
  });

  const filterContent = newProposal.content.split("\n");

  res.status(200).json(
    new ApiResponse(true, "Project Proposal", {
      content: filterContent,
      name: newProposal.name,
    })
  );
});

export const getProposalByUserId = wrapAsync(async (req, res, next) => {
  const uid = req.user?.id;

  // Fetching the user's proposals
  const proposals = await Proposal.find({ uid }).lean();

  const updatedProposals = proposals.map((proposal) => {
    const nProposal = proposal.content.split("\n");
    return { ...proposal, content: nProposal };
  });

  const output = updatedProposals.map((item) => ({
    ...item,
    content: item.content.filter((el) => el.trim() !== ""),
  }));

  res.status(200).json(new ApiResponse(true, "User Proposals", output));
});
