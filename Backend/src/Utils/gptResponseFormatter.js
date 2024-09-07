function formatProposalContent(content) {
  const lines = content.split("\n");
  const result = {};
  let currentSection = "";

  lines.forEach((line) => {
    if (line.startsWith("Proposal for")) {
      result.proposalTitle = line.trim();
    } else if (line.startsWith("Dear")) {
      result.greeting = line.trim();
    } else if (line.startsWith("Project Scope:")) {
      result.projectScope = { title: line.trim(), details: [] };
      currentSection = "projectScope";
    } else if (line.startsWith("Services Offered:")) {
      result.servicesOffered = { title: line.trim(), details: [] };
      currentSection = "servicesOffered";
    } else if (line.startsWith("Project Goals/Outcomes:")) {
      result.projectGoals = { title: line.trim(), details: [] };
      currentSection = "projectGoals";
    } else if (line.startsWith("Timeline:")) {
      result.timeline = { title: line.trim(), details: "" };
      currentSection = "timeline";
    } else if (line.startsWith("Sincerely")) {
      result.sincerely = line.trim();
      currentSection = "sincerely";
    } else {
      if (currentSection === "projectScope") {
        result.projectScope.details.push(line.trim());
      } else if (currentSection === "servicesOffered") {
        result.servicesOffered.details.push(line.trim());
      } else if (currentSection === "projectGoals") {
        result.projectGoals.details.push(line.trim());
      } else if (currentSection === "timeline") {
        result.timeline.details +=
          (result.timeline.details ? "\n" : "") + line.trim();
      } else if (currentSection === "sincerely") {
        result.sincerely += (result.sincerely ? "\n" : "") + line.trim();
      }
    }
  });

  return result;
}

export default formatProposalContent;
