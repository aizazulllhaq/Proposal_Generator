import { Box, LinearProgress, styled, Typography } from "@mui/material";

const SearchBarSection = styled("div")({
  width: "90%",
  maxWidth: 600,
  padding: "10px",
});

const Proposal = ({ data }) => {
  return (
    <SearchBarSection
      sx={{
        marginTop: "20px",
        backgroundColor: "#191919",
        padding: "0px 20px",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
      }}
    >
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
