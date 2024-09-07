function formatProposalContent(content) {
  const lines = content.split("\n").filter(line => line.trim() !== ""); // Filter out empty lines
  const result = {};
  let currentSection = "";

  lines.forEach((line) => {
    line = line.trim();

    if (line.startsWith("Proposal for")) {
      result.proposalTitle = line;
    } else if (line.startsWith("Dear")) {
      result.greeting = line;
    } else if (line.includes("front-end development") || line.includes("services I will provide")) {
      result.servicesOffered = result.servicesOffered || { title: "Services Offered", details: [] };
      currentSection = "servicesOffered";
    } else if (line.includes("project goals") || line.includes("goals and outcomes")) {
      result.projectGoals = result.projectGoals || { title: "Project Goals/Outcomes", details: [] };
      currentSection = "projectGoals";
    } else if (line.includes("timeline for completion") || line.includes("Timeline:")) {
      result.timeline = result.timeline || { title: "Timeline", details: "" };
      currentSection = "timeline";
    } else if (line.startsWith("Sincerely")) {
      result.sincerely = line;
      currentSection = "sincerely";
    } else {
      // Add content to the current section
      if (currentSection === "servicesOffered") {
        result.servicesOffered.details.push(line);
      } else if (currentSection === "projectGoals") {
        result.projectGoals.details.push(line);
      } else if (currentSection === "timeline") {
        result.timeline.details += (result.timeline.details ? "\n" : "") + line;
      } else if (currentSection === "sincerely") {
        result.sincerely += "\n" + line;
      }
    }
  });

  return result;
}

export default formatProposalContent;
