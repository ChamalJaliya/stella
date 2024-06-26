// capsule-profession/capsule-profession.tsx
"use client";
import Image from 'next/image'; 
import {
  Typography,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  List,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CapsuleProfessionInsightsProps {
  introduction: string;
  capsuleWardrobe: {
    category: string;
    items: {
      name: string;
      quantity: number;
    }[];
  }[];
  outfitEnsembles: {
    occasion: string;
    outfits: {
      description: string;
      items: string[];
    }[];
  }[];
  accessoriesAndEssentials: {
    category: string;
    items: string[];
  }[];
  mixAndMatchTips: string[];
}

const capsuleProfessionData: CapsuleProfessionInsightsProps = {
  introduction:
    "Capture the effortless elegance and timeless sophistication of Anne Hathaway's fashion in your Marketing Professional wardrobe, blending tailored silhouettes with luxurious fabrics and classic accessories.",
  capsuleWardrobe: [
    {
      category: "Silk Blouses",
      items: [
        { name: "Cream-colored silk blouse", quantity: 1 },
        { name: "White silk blouse", quantity: 1 },
      ],
    },
    {
      category: "Blazers",
      items: [
        { name: "Black blazer with zippered pocket", quantity: 1 },
        { name: "Gray and black houndstooth blazer", quantity: 1 },
        { name: "Black blazer with floral pattern", quantity: 1 },
      ],
    },
    {
      category: "Dresses",
      items: [
        { name: "Zebra-striped dress", quantity: 1 },
        { name: "Floral print dress", quantity: 1 },
        { name: "Black dress with subtle patterns", quantity: 1 },
      ],
    },
    {
      category: "Skirts",
      items: [
        { name: "Pink silk skirt", quantity: 1 },
        { name: "High-waisted black mini skirt", quantity: 1 },
      ],
    },
    {
      category: "Pants",
      items: [
        { name: "Tailored black trousers", quantity: 1 },
        { name: "Tailored gray trousers", quantity: 1 },
      ],
    },
    {
      category: "Camisoles",
      items: [
        { name: "Black camisole", quantity: 1 },
        { name: "White camisole", quantity: 1 },
      ],
    },
    {
      category: "Outerwear",
      items: [{ name: "Classic beige trench coat", quantity: 1 }],
    },
    {
      category: "Footwear",
      items: [
        { name: "Black heels", quantity: 1 },
        { name: "Black platform loafers", quantity: 1 },
        { name: "Knee-high black boots", quantity: 1 },
      ],
    },
  ],
  outfitEnsembles: [
    {
      occasion: "Meetings and Presentations",
      outfits: [
        {
          description:
            "Cream-colored silk blouse paired with tailored black trousers, black blazer with floral pattern, and black heels. Accessorize with your pearl necklace for an added touch of elegance.",
          items: [
            "Cream-colored silk blouse",
            "Tailored black trousers",
            "Black blazer with floral pattern",
            "Black heels",
            "Pearl necklace",
          ],
        },
        {
          description:
            "Zebra-striped dress with black blazer with zippered pocket and black heels. Add a red lip and Givenchy Gold and Rhinestone Choker Necklace for a bold, confident look.",
          items: [
            "Zebra-striped dress",
            "Black blazer with zippered pocket",
            "Black heels",
            "Givenchy Gold and Rhinestone Choker Necklace",
          ],
        },
      ],
    },
    {
      occasion: "Networking Events and Conferences",
      outfits: [
        {
          description:
            "Light pink ruffled blouse with gray and black houndstooth blazer and black mini skirt. Pair with black platform loafers and the Vintage Lanvin Crystal Necklace for a statement.",
          items: [
            "Light pink ruffled blouse",
            "Gray and black houndstooth blazer",
            "Black mini skirt",
            "Black platform loafers",
            "Vintage Lanvin Crystal Necklace",
          ],
        },
        {
          description:
            "Black dress with subtle pattern, cinched at the waist with a thin belt. Add black knee-high boots and Vintage Gold Dangle Earrings for a sophisticated yet trendy ensemble.",
          items: [
            "Black dress with subtle pattern",
            "Thin belt",
            "Black knee-high boots",
            "Vintage Gold Dangle Earrings",
          ],
        },
      ],
    },
    {
      occasion: "Casual Fridays",
      outfits: [
        {
          description:
            "White blouse tucked into your pink silk skirt, topped with a simple beige trench coat. Finish the look with Sergio Rossi Black Platform Loafers and Simple Gold Necklace.",
          items: [
            "White blouse",
            "Pink silk skirt",
            "Beige trench coat",
            "Sergio Rossi Black Platform Loafers",
            "Simple Gold Necklace",
          ],
        },
        {
          description:
            "White camisole paired with tailored gray trousers and your pink tweed jacket with embellishments. Complete with Simple Gold Hoop Earrings and a Custom Painted Pink Rolex Watch.",
          items: [
            "White camisole",
            "Tailored gray trousers",
            "Pink tweed jacket",
            "Simple Gold Hoop Earrings",
            "Custom Painted Pink Rolex Watch",
          ],
        },
      ],
    },
  ],
  accessoriesAndEssentials: [
    { category: "Structured Tote", items: ["Classic black tote"] },
    {
      category: "Scarves",
      items: ["Silk scarves in neutral tones or soft prints"],
    },
    {
      category: "Jewelry",
      items: [
        "Pearl necklace",
        "Ruby necklace",
        "Kathy Waterman Fine Jewelry Vine Bracelet",
      ],
    },
    {
      category: "Watches",
      items: ["Custom Painted Pink Rolex Watch", "Gold Watch"],
    },
  ],
  mixAndMatchTips: [
    "Layering: Use your camisoles under blazers for a sophisticated look or wear blazers over dresses to add structure and formality.",
    "Color Play: Stick to Anne’s preferred palette of black, white, beige, and jewel tones to ensure mix-and-match versatility.",
    "Bold vs. Subtle: Balance bold pieces like your zebra-striped dress with subtle accessories, or dress down a statement blazer with neutral blouses and skirts.",
    "Transitional Looks: Use scarves, cardigans, and coats to transition from day to evening events seamlessly.",
    "Jewelry Rotation: Alternate between statement and minimalist jewelry to add variety without overwhelming your look.",
  ],
};



const CapsuleProfessionInsights: React.FunctionComponent = () => {

    const getIconForCategory = (category: string) => {
        switch (category) {
          case "Silk Blouses":
            return '/assets/icons/blouse.svg';
        
          default:
            return '/assets/icons/coat.svg';
        }
      };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textDecoration: "underline" }}
      >
        Capsule Collection for the Marketing Professional
      </Typography>

      <Typography variant="body1">
        {capsuleProfessionData.introduction}
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom >
          Capsule Wardrobe
        </Typography>
        <Grid container spacing={2}>
          {capsuleProfessionData.capsuleWardrobe.map((category) =>
            category.items.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={item.name}>
                <Card>
                  <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image 
                      src={getIconForCategory(category.category)} 
                      alt={`${category.category} icon`} 
                      width={24} 
                      height={24}
                    />
                    <Typography variant="body1" sx={{ ml: 2 }}>{item.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Outfit Ensembles for Different Professional Occasions
        </Typography>

        {capsuleProfessionData.outfitEnsembles.map((ensemble, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <b>{ensemble.occasion}</b>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {ensemble.outfits.map((outfit, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={outfit.description}
                      secondary={
                        <Typography component="span" variant="body2">
                          Items: {outfit.items.join(", ")}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Accessories and Essentials
        </Typography>
        {capsuleProfessionData.accessoriesAndEssentials.map(
          (category, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <b>{category.category}</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {category.items.map((item, idx) => (
                    <ListItem key={idx}>
                      <ListItemText secondary={item} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )
        )}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Tips on How to Mix and Match Items
        </Typography>
        <List>
          {capsuleProfessionData.mixAndMatchTips.map((tip, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={tip} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CapsuleProfessionInsights;
