"use client"
import { Box, Container } from "@mui/material";
import CelebrityStyleInsight from "../celebrity-style/celebrity-style";
import DressLikeCelebInsights from "../dress-like-celeb/dress-like-celeb";
import CapsuleProfessionInsights from "../capsule-profession/capsule-profession";
import CelebComparisonInsights from "../celeb-comparison-report/celeb-comparison-report";

interface FashionInsightsProps {}

const FashionInsights: React.FunctionComponent<FashionInsightsProps> = () => {
  return (
    <Container>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CelebrityStyleInsight />
      </Box>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <DressLikeCelebInsights />
      </Box>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CapsuleProfessionInsights />
      </Box>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CelebComparisonInsights />
      </Box>
    </Container>
  );
};

export default FashionInsights;
