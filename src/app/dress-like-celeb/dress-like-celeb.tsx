// dress-like-celeb/dress-like-celeb.tsx
"use client";
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
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface DressLikeCelebInsightsProps {
  celebrityName: string;
  introduction: string;
  tips: {
    title: string;
    description: string;
    items: string[]; // Array of item names mentioned in the description
  }[];
  ensembles: {
    occasion: string;
    looks: {
      description: string;
      items: string[];
    }[];
  }[];
  accessoriesAndEssentials: {
    category: string;
    items: string[];
  }[];
  mixAndMatchTips: string[];
  conclusion: string;
}

const dressLikeData: DressLikeCelebInsightsProps = {
  celebrityName: "Anne Hathaway",
  introduction:
    "Anne Hathaway’s fashion style is a masterful blend of elegance, timelessness, and versatility, making her a true icon in the fashion world.",
  tips: [
    {
      title: "Sophisticated Elegance",
      description:
        "Create refined looks with your white silk blouses, pairing them with a high-waisted black skirt or tailored trousers. This aligns with Anne's penchant for clean, tailored lines.",
      items: [
        "white silk blouse",
        "high-waisted black skirt",
        "tailored trousers",
      ],
    },
    {
      title: "Red Carpet Glamour",
      description:
        "Transform your wardrobe into red carpet-ready by pairing your black dress with subtle patterns with Gianvito Rossi knee-high boots and a statement necklace like the Vintage Lanvin Crystal Necklace.",
      items: [
        "black dress with subtle patterns",
        "Gianvito Rossi knee-high boots",
        "Vintage Lanvin Crystal Necklace",
      ],
    },
    {
      title: "Casual Chic",
      description:
        "Emulate Anne's off-duty chic by combining your pink tweed jacket with Givenchy black satin shorts and Sergio Rossi black platform loafers.",
      items: [
        "pink tweed jacket",
        "Givenchy black satin shorts",
        "Sergio Rossi black platform loafers",
      ],
    },
    {
      title: "Professional Style",
      description:
        "Pair your gray and black houndstooth blazer with a cream-colored silk blouse and black mini skirt for a professional yet elegant look.",
      items: [
        "gray and black houndstooth blazer",
        "cream-colored silk blouse",
        "black mini skirt",
      ],
    },
    {
      title: "Luxe Fabric Play",
      description:
        "Make use of luxurious fabrics like silk and velvet. Pair your Equipment zebra-striped tunic dress with the Fendi black tuxedo blazer for a high-contrast, fashion-forward look.",
      items: [
        "Equipment zebra-striped tunic dress",
        "Fendi black tuxedo blazer",
      ],
    },
    {
      title: "Minimalist Beading",
      description:
        "Integrate your black blazer with floral patterns over the bright pink blouse and tailored trousers to incorporate Anne’s affinity for subtle embellishments.",
      items: [
        "black blazer with floral patterns",
        "bright pink blouse",
        "tailored trousers",
      ],
    },
    {
      title: "Elegant Accessories",
      description:
        "Elevate your outfits with your Cartier Love Ring and Simple Diamond Stud Earrings to match Anne's sophisticated essence.",
      items: ["Cartier Love Ring", "Simple Diamond Stud Earrings"],
    },
    {
      title: "Jewel Tones",
      description:
        "Embrace vibrant colors as Anne does with jewel tones, by using your bright pink blouse and styling it with classic, well-fitted bottoms like the textured blazer from Chanel tweed and a black mini skirt.",
      items: [
        "bright pink blouse",
        "Chanel tweed textured blazer",
        "black mini skirt",
      ],
    },
  ],
  ensembles: [
    {
      occasion: "Casual Outings",
      looks: [
        {
          description:
            "Cream-colored silk blouse paired with pink silk skirt. Add a touch of elegance with black knee-high boots and the Vintage Lanvin Crystal Necklace.",
          items: [
            "cream-colored silk blouse",
            "pink silk skirt",
            "black knee-high boots",
            "Vintage Lanvin Crystal Necklace",
          ],
        },
        {
          description:
            "Zebra-striped dress dressed down with sandals and a custom painted pink Rolex watch for a mix of casual and sophistication.",
          items: [
            "zebra-striped dress",
            "sandals",
            "custom painted pink Rolex watch",
          ],
        },
      ],
    },
    {
      occasion: "Formal Events",
      looks: [
        {
          description:
            "Black dress with subtle patterns styled with metallic accessories, Pearl Necklace, and Gianvito Rossi knee-high boots.",
          items: [
            "black dress with subtle patterns",
            "metallic accessories",
            "Pearl Necklace",
            "Gianvito Rossi knee-high boots",
          ],
        },
        {
          description:
            "Floral print dress with heels, Givenchy Gold and Rhinestone Choker Necklace, and the Magda Butrym black bodysuit for a feminine and bold look.",
          items: [
            "floral print dress",
            "heels",
            "Givenchy Gold and Rhinestone Choker Necklace",
            "Magda Butrym black bodysuit",
          ],
        },
      ],
    },
    {
      occasion: "Work Attire",
      looks: [
        {
          description:
            "Gray and black houndstooth blazer over the cream silk blouse, paired with tailored black mini skirt and Sergio Rossi black platform loafers for a polished look.",
          items: [
            "gray and black houndstooth blazer",
            "cream silk blouse",
            "tailored black mini skirt",
            "Sergio Rossi black platform loafers",
          ],
        },
        {
          description:
            "Black textured blazer from Chanel tweed jacket styled with a white blouse, high-waisted black trousers, and the Custom Painted Pink Rolex Watch.",
          items: [
            "Chanel tweed textured blazer",
            "white blouse",
            "high-waisted black trousers",
            "Custom Painted Pink Rolex Watch",
          ],
        },
      ],
    },
  ],
  accessoriesAndEssentials: [
    {
      category: "Jewelry",
      items: [
        "Pearl Necklace",
        "Vintage Lanvin Crystal Necklace",
        "Cartier Love Ring",
        "Stackable Black Diamond Rings",
        "Simple Diamond Stud Earrings",
      ],
    },
    {
      category: "Watches",
      items: ["Custom Painted Pink Rolex Watch", "Gold Watch (Citizen-like)"],
    },
    {
      category: "Footwear",
      items: [
        "Gianvito Rossi Black Knee-High Boots",
        "Sergio Rossi Black Platform Loafers",
      ],
    },
  ],
  mixAndMatchTips: [
    "Versatility: Mix your neutral basics like the white and cream silk blouses with statement pieces such as patterned blazers and colorful skirts.",
    "Layering: Use your black sheer blouse as a base layer under elegant blazers like the pink tweed with embellishments to add a level of sophistication.",
    "Color Coordination: Play with your jewel-toned pieces by balancing them with neutral hues in your wardrobe to maintain elegance and vibrancy.",
  ],
  conclusion:
    "By carefully integrating these elements of Anne Hathaway’s style into your wardrobe, you’ll master her blend of polished elegance, chic sophistication, and versatility, ensuring your outfits are always poised and fashionable.",
};

const DressLikeCelebInsights: React.FunctionComponent = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textDecoration: "underline" }}
      >
        Dress Like {dressLikeData.celebrityName}
      </Typography>
      <Typography variant="body1">{dressLikeData.introduction}</Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          {dressLikeData.celebrityName}&apos;s Style Tips
        </Typography>
        <List>
          {dressLikeData.tips.map((tip, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={tip.title} secondary={tip.description} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Outfit Ensembles for Different Occasions
        </Typography>
        {dressLikeData.ensembles.map((ensemble, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {" "}
                <b> {ensemble.occasion}</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {ensemble.looks.map((look, idx) => (
                  <ListItem key={idx}>
                    <ListItemText secondary={look.description} />
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
        {dressLikeData.accessoriesAndEssentials.map((category, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><b>{category.category}</b></Typography>
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
        ))}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Tips on How to Mix and Match Items
        </Typography>
        <List>
          {dressLikeData.mixAndMatchTips.map((tip, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={tip} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Conclusion
        </Typography>
        <Typography variant="body1">{dressLikeData.conclusion}</Typography>
      </Box>
    </Box>
  );
};

export default DressLikeCelebInsights;
