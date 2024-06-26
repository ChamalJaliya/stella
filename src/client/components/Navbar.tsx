"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
// model
import { FashionInsightDataType } from "@/enums/fashion-insights-enum";
import { jsPDF } from "jspdf";
// ui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";

const links = [
  { label: "Video Onboard", href: "/" },
  { label: "Explore My Wardrobe", href: "/my-closet" },
  { label: "Celebrity Style Analyzer", href: "/celebrity-style" },
  // { label: "LLM Input Combiner", href: "/llm-combiner" },
  { label: "8 Ways to Dress like Celeb X", href: "/dress-like-celeb" },
  { label: "Capsule for Profession X", href: "/capsule-profession" },
  { label: "Celeb Comparison Report", href: "/celeb-comparison-report" },
  { label: "New Item Recommendations", href: "/recommendation-new-item" },
  { label: "Accessory Recommendations", href: "/recommendation-accessory" },
  {
    label: "Outfit Recommendations for Occasion X",
    href: "/recommendation-outfit-occasion",
  },
  {
    label: "Outfit Recommendations for Vacation",
    href: "/recommendation-outfit-vacation",
  },
  {
    label: "Fashion Insights",
    href: "/fashion-insights",
  },
];

export default function Navbar() {
  const dispatch = useDispatch();

  const fashionInsights = useSelector(
    (state: RootState) => state.fashionInsights.data
  );
  const celebrityName = useSelector(
    (state: RootState) => state.celebrityStyle.celebrityName
  );

  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showMore, setShowMore] = React.useState(false);
  const pathname = usePathname();

  const insightTypeToHeading: { [key in FashionInsightDataType]: string } = {
    [FashionInsightDataType.CELEBRITY_STYLE_DATA]: "Celebrity Style Data",
    [FashionInsightDataType.EXISTING_WARDROBE]: "Existing Wardrobe",
    [FashionInsightDataType.WAYS_TO_DRESS_LIKE]: "Ways to Dress Like",
    [FashionInsightDataType.CAPSULE_PROFESSION]: "Capsule Profession",
    [FashionInsightDataType.COMPARISON_REPORT]: "Comparison Report",
    [FashionInsightDataType.ACCESSORY_RECOMMENDATION]:
      "Accessory Recommendation",
    [FashionInsightDataType.ITEM_RECOMMENDATION]: "Item Recommendation",
    [FashionInsightDataType.OUTFIT_RECOMMENDATION_VACATION]:
      "Outfit Recommendation for Vacation",
    [FashionInsightDataType.OUTFIT_RECOMMENDATION_OCCASION]:
      "Outfit Recommendation for Occasion",
  };

  const navBarRef = React.useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    const doc = new jsPDF();
    let verticalOffset = 10;

    for (const insightType in fashionInsights) {
      const heading =
        insightTypeToHeading[insightType as FashionInsightDataType];
      const data = fashionInsights[insightType as FashionInsightDataType];

      if (data) {
        const splitData = doc.splitTextToSize(data, 180);
        const lineHeight = doc.getTextDimensions("M").h;

        doc.setFontSize(14);
        doc.text(heading, 10, verticalOffset);

        verticalOffset += 10;
        doc.setFontSize(12);
        for (const line of splitData) {
          if (verticalOffset + lineHeight > doc.internal.pageSize.getHeight()) {
            doc.addPage();
            verticalOffset = 10;
            doc.setFontSize(12);
          }
          doc.text(line, 10, verticalOffset);
          verticalOffset += lineHeight;
        }
        verticalOffset += 10;
      }
    }
    const formattedFileName =
      celebrityName.toLowerCase().replace(/\s+/g, "_") +
      "_fashion_insights.pdf";

    doc.save(formattedFileName);
  };

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  const handleFlushState = () => {
    dispatch({ type: "RESET_ALL" });
  };

  // const visibleLinks = showMore ? links : links.slice(0, -1); // Exclude last link initially

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
        {" "}
        {/* Remove default padding */}
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            width: "100%",
            // borderBottom: "1px solid rgba(255, 255, 255, 0.12)", // Add bottom border
            paddingBottom: 1, // Add padding to accommodate scrollbar
            paddingTop: 2, // Add padding to accommodate scrollbar
            "&::-webkit-scrollbar": {
              height: 4, // Further reduce scrollbar height
              backgroundColor: "transparent", // Make background transparent
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "warning.main",
              borderRadius: 2,
              width: 2, // Further reduce indicator width
            },
          }}
        >
          {/* <Box sx={{ ml: "auto", display: "flex" }}>
           
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Stella AI
            </Typography>
          </Box> */}
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} passHref legacyBehavior>
              <Button
                color={pathname === link.href ? "warning" : "inherit"}
                sx={{
                  m: 0.5,
                  border: "none",
                  flex: "none",
                  minWidth: 0,
                  whiteSpace: "nowrap",
                  textTransform: "none",
                  fontSize: { xs: "0.7rem", sm: "0.875rem" },
                  borderLeft: "1px solid white",
                  "&:first-of-type": { borderLeft: "none" },
                }}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </Box>
        <Box sx={{ ml: "auto", display: "flex", pl: 2 }}>
          <Tooltip title="Download Fashion Insights">
            <IconButton
              onClick={generatePDF}
              sx={{ color: "white", "&:hover": { color: "warning.main" } }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Flush State">
            <IconButton
              onClick={handleFlushState}
              sx={{ color: "white", "&:hover": { color: "warning.main" } }}
            >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
