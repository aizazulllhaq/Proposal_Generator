import {
  Box,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { CheckCircle, ContentCopy } from "@mui/icons-material";
import { useState } from "react";

const SearchBarSection = styled("div")({
  width: "90%",
  maxWidth: 600,
  padding: "10px",
});

const Proposal = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (data) {
      const textToCopy = data.content.join("\n");
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {}
      console.error("Failed to copy text: ", error);
    }
  };

  const handleDownload = () => {
    if (data) {
      const proposalText = `Proposal Name: ${data.name}\n\n${data.content.join(
        "\n"
      )}`;
      const blob = new Blob([proposalText], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.name}-proposal.txt`; // File name for download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Clean up after the download
    }
  };

  return (
    <SearchBarSection
      sx={{
        marginTop: "20px",
        backgroundColor: "#191919",
        padding: "0px 20px",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
        position: "relative",
      }}
    >
      <Box
        onClick={handleCopy}
        sx={{
          position: "absolute",
          cursor: "pointer",
          top: "10px",
          right: "10px",
          color: "white",
          padding:"8px 8px",
          zIndex:10,
        }}
      >
        {copied ? <CheckCircle /> : <ContentCopy />}
      </Box>
      <Button
        variant="outlined"
        onClick={handleDownload}
        size="small"
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "white",
          borderColor: "white",
          padding: "8px 16px", // Adequate padding for clicking
          zIndex: 10,     
        }}
      >
        Download Proposal
      </Button>
      <Typography
        sx={{ opacity: 0.9, fontWeight: 50, fontSize: 18, marginTop: 2 }}
      >
        {data && (
          <Box>
            <br />
            <Typography variant="h4" textAlign={"center"}>
              {data.name}
            </Typography>
            <br />
            {data.content.map((item, index) => {
              const colonIndex = item.indexOf(":");
              if (colonIndex !== -1) {
                const heading = item.substring(0, colonIndex + 1).trim();
                const content = item.substring(colonIndex + 1).trim();

                return (
                  <Box key={index}>
                    <br />
                    <Typography variant="h5">{heading}</Typography>
                    <Typography variant="p">{content}</Typography>
                  </Box>
                );
              } else {
                return (
                  <Box key={index}>
                    <Typography variant="p">{item}</Typography>
                    <br />
                  </Box>
                );
              }
            })}
          </Box>
        )}
      </Typography>
    </SearchBarSection>
  );
};

export default Proposal;
