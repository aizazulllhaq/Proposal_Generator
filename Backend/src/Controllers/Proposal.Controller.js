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

  // const formattedContent = formatProposalContent(proposal);

  const newProposal = await Proposal.create({
    name,
    description,
    uid,
    content: proposal,
  });

  res.status(200).json(new ApiResponse(true, "Project Proposal", newProposal));
});

export const getProposalByUserId = wrapAsync(async (req, res, next) => {
  const uid = req.user?.id;

  // Fetching the user's proposals
  const proposals = await Proposal.find({ uid }).lean();

  console.log("all proposals : ", proposals);
  console.log("--------------------------------");
  const updatedProposals = proposals.map((proposal) => {
    const nProposal = proposal.content.split("\n");
    return { ...proposal, content: nProposal };
  });

  const output = updatedProposals.map((item) => ({
    ...item,
    content: item.content.filter((el) => el.trim() !== ""),
  }));

  // const finalOutput = output.map((item) => {
  //   const filterContent = item.content.map((item) =>
  //     item.trim().endsWith(":") ? `**${item.trim()}**` : item
  //   );
  //   return {
  //     ...output,
  //     content: filterContent,
  //   };
  // });

  // Send the response with the user's proposals
  res.status(200).json(new ApiResponse(true, "User Proposals", output));
});
