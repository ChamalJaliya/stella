// celebrity-style/celebrity-style.tsx
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { FashionInsightDataType } from "@/enums/fashion-insights-enum";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Carousel from "react-material-ui-carousel";

export interface CelebrityStyleInsightProps {
  introduction: string;
  keyElements: { name: string; description: string }[];
  signatureLooks: { name: string; description: string }[];
  preferredBrands: { name: string; description: string }[];
  conclusion: string;
}

const CelebrityStyleInsight: React.FC = () => {
  // 2. Get celebrity style data from Redux store
  const celebrityStyleDataRaw = useSelector(
    (state: RootState) =>
      state.fashionInsights.data[FashionInsightDataType.CELEBRITY_STYLE_DATA]
  );

  const { celebrityName } = useSelector(
    (state: RootState) => state.celebrityStyle
  );

  // 3. Extract structured data from the raw data (handling null case)
  const celebrityStyleData = {
    introduction: `Anne Hathaway's fashion style is a masterful blend of elegance, versatility, and sophistication, making her a true icon in the fashion world. Her style choices reflect her personality—graceful, refined, and always with a touch of modernity.`,

    keyElements: [
      {
        name: "Color Palette",
        description:
          "Anne Hathaway often chooses a palette of black, white, emerald green, and navy, which not only complement her fair complexion but also create a timeless and polished foundation for her outfits.",
      },
      {
        name: "Structured Elegance",
        description:
          "She embraces tailored cuts, delicate embroidery, and flowing fabrics, favoring a sophisticated approach that emphasizes her tall and slender frame.",
      },
      {
        name: "Clothing Types",
        description:
          "Whether it's a red carpet event or a casual outing, Anne Hathaway's clothing is often elegant, showcasing structured silhouettes that highlight her refined physique.",
      },
      {
        name: "Luxurious Fabrics",
        description:
          "She opts for silk, chiffon, and velvet, adding a touch of opulence and grace to her style.",
      },
      {
        name: "Subtle Embellishments",
        description:
          "Anne Hathaway prefers outfits with intricate beading, lace, and sequins, allowing her classic elegance to shine through without unnecessary distractions.",
      },
    ],

    signatureLooks: [
      {
        name: "Red Carpet Events",
        description:
          "Anne Hathaway is renowned for her glamorous appearances in dramatic gowns, often featuring intricate detailing, plunging necklines, and high-slit designs, making her a constant figure of elegance on the red carpet.",
      },
      {
        name: "Professional Roles",
        description:
          "For professional events, she often sports tailored blazers, statement trousers, and sophisticated jumpsuits, reflecting her confidence and refined persona. These are frequently seen in neutral shades, blending modern style and timeless sophistication seamlessly.",
      },
      {
        name: "Off-Duty",
        description:
          "Off-duty, her style includes high-waisted jeans paired with chic blouses or knit sweaters, topped with stylish outerwear like trench coats or tailored jackets, embodying a relaxed yet polished aesthetic.",
      },
      {
        name: "Formal Settings",
        description:
          "In her role as a public figure, Anne Hathaway opts for more structured, elegant attire that is both sophisticated and aligned with her overall chic aesthetic.",
      },
    ],

    preferredBrands: [
      {
        name: "Valentino",
        description:
          "Known for her long-standing relationship with Valentino, Anne Hathaway often chooses their dramatic gowns for their intricate detailing and timeless elegance.",
      },
      {
        name: "Armani",
        description:
          "She frequently wears Armani for their impeccable tailoring and classic silhouettes, particularly their gowns and suits.",
      },
      {
        name: "Chanel",
        description:
          "Anne Hathaway turns to Chanel for outfits that combine modernity with classic beauty, ensuring her look is always chic and refined.",
      },
      {
        name: "Prada and Gucci",
        description:
          "These designers are favored for their commitment to high-caliber craftsmanship and luxurious fabrics, aligning with Anne Hathaway's personal values of quality and luxury.",
      },
      {
        name: "Oscar de la Renta and Rodarte",
        description:
          "These brands are selected for important events, reflecting her sophisticated taste in both red carpet and formal wear.",
      },
    ],

    conclusion:
      "Anne Hathaway's fashion choices not only highlight her status as a style icon but also her commitment to sophistication, refinement, and timeless elegance. Her ability to maintain a distinctive and consistent aesthetic while adapting her wardrobe to various roles and responsibilities showcases her exceptional taste and influence in the fashion world.",
  };

  if (!celebrityStyleData) {
    return <div>Loading or no celebrity style data available</div>; 
  }


  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "2rem",
      }}
    >
    
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {/* {celebrityName.toUpperCase()} */}
          Anne Harthaway
        </Typography>
        <Typography variant="body1">
          {celebrityStyleData.introduction}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Carousel
          autoPlay={true}
          // navButtonsAlwaysVisible
          animation="slide"
          fullHeightHover={false}
          sx={{
            width: '40%',

            '& .MuiCard-root': { 
              backgroundColor: '#f5f5f5', 
              borderRadius: '12px',      
              padding: '1.5rem',    
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', 
            },
            '& .MuiIconButton-root': { 
              color: '#333',
              fontSize: '2rem',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
            },
            '& .MuiCarousel-indicators': {
              position: 'absolute',
              bottom: 10,
              left: '50%',
              transform: 'translateX(-50%)',
            },
            '& .MuiCarousel-indicator': {
              width: 8,
              height: 8,
              borderRadius: '50%',
            },
          }}
        >
          {celebrityStyleData.keyElements.map((element, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {element.name}
                </Typography>
                <Typography variant="body2">{element.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </Box>

     
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Signature Looks
          </Typography>
          <List>
            {celebrityStyleData.signatureLooks.map((look, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={look.name}
                  secondary={look.description}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>


        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Preferred Brands
          </Typography>
          <List>
            {celebrityStyleData.preferredBrands.map((brand, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={brand.name}
                  secondary={brand.description}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>


      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Conclusion
        </Typography>
        <Typography variant="body1">{celebrityStyleData.conclusion}</Typography>
      </Box>
    </Box>
  );
};

export default CelebrityStyleInsight;
