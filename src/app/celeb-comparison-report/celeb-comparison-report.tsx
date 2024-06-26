// celeb-comparison-report/celeb-comparison-report.tsx
"use client";
import {
  Typography,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
  Box,
  List,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

interface CelebComparisonInsightsProps {
  celebrityName: string;
  matches: {
    category: string;
    items: string[];
  }[];
  gaps: {
    category: string;
    items: string[];
  }[];
  recommendations: {
    description: string;
    brands: string[];
  }[];
  integrationTips: string[];
  additionalNotes: string;
}

const celebComparisonData: CelebComparisonInsightsProps = {
  celebrityName: "Anne Hathaway",
  matches: [
    {
      category: "Color Palette",
      items: [
        "Khaite Ivory Silk Blouse with Draped Detail",
        "White silk blouse",
        "L'Agence White Collared Blouse",
        "Black blazers (various patterns and styles)",
      ],
    },
    {
      category: "Clean, Tailored Lines",
      items: ["Fendi Black Tuxedo Blazer", "Black blazer with zippered pocket"],
    },
    {
      category: "Luxurious Fabrics",
      items: [
        "Khaite Ivory Silk Blouse",
        "White Silk Blouse",
        "Equipment Zebra-Striped Tunic Dress",
      ],
    },
    {
      category: "Minimal Embellishments",
      items: [
        "Cream-colored silk blouse",
        "Pink tweed jacket with embellishments",
      ],
    },
    {
      category: "Signature Looks",
      items: [
        "Zebra Stripe Dress",
        "Black Dress with Subtle Pattern",
        "Floral print dress",
      ],
    },
  ],
  gaps: [
    {
      category: "Jewel Tones",
      items: ["Emerald green", "Sapphire blue"],
    },
    {
      category: "Flowing Gowns and Red Carpet Glamour",
      items: ["Floor-length gowns", "Flowing evening dresses"],
    },
    {
      category: "Professional and Structured Attire",
      items: ["Structured dresses", "Tailored suits"],
    },
    {
      category: "Luxurious Outerwear",
      items: ["Elegant trench coat", "Tailored coat"],
    },
  ],
  recommendations: [
    {
      description: "Add Items in Jewel Tones",
      brands: ["Valentino", "Oscar de la Renta"],
    },
    {
      description: "Invest in Flowing Evening Gowns",
      brands: ["Giorgio Armani", "Prada"],
    },
    {
      description: "Structured Dresses and Suits",
      brands: ["Giorgio Armani", "Chanel"],
    },
    {
      description: "Luxurious Outerwear",
      brands: [], // No specific brands mentioned
    },
  ],
  integrationTips: [
    "Color Coordination: Pair jewel-tone blouses with your neutral blazers and skirts to add a pop of color to your professional wardrobe.",
    "Layering: Layer the new tailored coats or trench coats over your existing blazers and silk blouses for a sophisticated look that can transition from day to night.",
    "Accessorize Elegantly: Use your pearl bracelet and delicate necklaces to complement flowing gowns or structured dresses, adding a touch of refined elegance.",
    "Incorporating New Fabrics: Combine new luxurious fabrics like velvet or silk gowns with your existing minimalist blouses for a mix of textures that elevate your ensemble.",
  ],
  additionalNotes:
    "When acquiring new pieces, prioritize quality and fit, as Anne Hathaway's style is defined by a polished and tailored appearance.Your personal style preferences and lifestyle should be considered to ensure the practicality of new additions, making sure they blend seamlessly with your current wardrobe.",
};

const CelebComparisonInsights: React.FunctionComponent = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textDecoration: "underline" }}
      >
        Celeb Comparison Report Inspired by {celebComparisonData.celebrityName}
      </Typography>
      <Box
        sx={{ my: 4, display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Carousel
          autoPlay={true}
          // navButtonsAlwaysVisible
          animation="slide"
          fullHeightHover={false}
          sx={{
            width: "40%",

            "& .MuiCard-root": {
              backgroundColor: "#f5f5f5", // Light background
              borderRadius: "12px", // Rounded corners
              padding: "1.5rem", // Increased padding
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow
            },
            "& .MuiIconButton-root": {
              // Target the navigation buttons
              color: "#333", // Darker color for better contrast
              fontSize: "2rem", // Larger buttons
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)", // Subtle hover effect
              },
            },
            "& .MuiCarousel-indicators": {
              // Target the indicators
              position: "absolute",
              bottom: 10, // Move indicators to the bottom
              left: "50%",
              transform: "translateX(-50%)",
            },
            "& .MuiCarousel-indicator": {
              width: 8, // Smaller dots
              height: 8,
              borderRadius: "50%",
            },
          }}
        >
          {celebComparisonData.matches.map((match) => (
            <Card key={match.category}>
              <CardContent sx={{ display: "flex", alignItems: "flex-start" }}>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRight: "1px solid lightgray",
                    pr: 2,
                  }}
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    {match.category}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    pl: 2,
                  }}
                >
                  {match.items.map((item, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <RadioButtonCheckedIcon sx={{ fontSize: 6, mr: 1 }} />{" "}
                      {/* Bullet point */}
                      <Typography variant="body1">{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Gaps
        </Typography>
        {celebComparisonData.gaps.map((gap) => (
          <Accordion key={gap.category}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><b>{gap.category}</b></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {gap.items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recommendations
        </Typography>
        {celebComparisonData.recommendations.map((recommendation, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography> <b>{recommendation.description}</b></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {recommendation.brands.length > 0 ? (
                <List>
                  {recommendation.brands.map((brand, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={brand} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2">
                  No Specific Brands Mentioned
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Tips on How to Mix and Match Items
        </Typography>
        <List>
          {celebComparisonData.integrationTips.map((tip, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={tip} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Additional Notes
        </Typography>
        <Typography variant="body1">
          {celebComparisonData.additionalNotes}
        </Typography>
      </Box>
    </Box>
  );
};

export default CelebComparisonInsights;
