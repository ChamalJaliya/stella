"use client";
import React, { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  styled,
  InputLabel,
  SxProps,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  multiline: true,
  padding: theme.spacing(1),
  fontSize: theme.typography.body1.fontSize,
  border: "1px solid gray",
  borderRadius: theme.shape.borderRadius,
  resize: "vertical",
  "&:focus": {
    outline: "none",
    border: "1px solid blue",
    borderColor: "blue",
  },
  "&:hover ": {
    borderColor: "blue",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  "& textarea": {
    resize: "vertical",
    paddingTop: theme.spacing(2),
    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.54)",
    },
  },
}));

interface CustomTextAreaProps {
  label: string;
  defaultValue?: string;
  showLabel?: boolean;
  hidden?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number; // Number of initial rows
  maxRows?: number; // Maximum number of rows // ... other props you want to pass down
}
const CustomTextArea: React.FC<CustomTextAreaProps & { sx?: SxProps }> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 10,
  maxRows,
  showLabel = true,
  defaultValue,
  sx,
  hidden = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const [isExpanded, setIsExpanded] = useState(false); // Add a state for expansion

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setHasValue(!!value);
  };

  return (
    <div style={{ position: "relative", display: hidden ? "none" : "block" }}>
      {showLabel ? (
        <InputLabel
          htmlFor="custom-textarea"
          sx={{
            position: "absolute",
            top: isFocused || hasValue ? "-8px" : "16px",
            left: "16px",
            backgroundColor: "white",
            padding: "4px 8px",
            zIndex: 1,
            transition: "top 200ms ease-in-out",
            fontSize: isFocused || hasValue ? "12px" : "16px",
          }}
        >
          {label}
        </InputLabel>
      ) : null}

      <StyledTextarea
        id="custom-textarea"
        aria-label={label}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => {
          setHasValue(!!e.target.value);
          if (onChange) onChange(e);
        }}
        placeholder={isFocused || hasValue ? placeholder : null}
        minRows={rows}
        maxRows={isExpanded ? maxRows : rows}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={sx} // Apply sx prop here
        {...rest}
      />
      <Tooltip title={isExpanded ? "Collapse" : "Expand"}>
        <IconButton
          onClick={toggleExpand}
          sx={{
            position: "absolute",
            right: "16px",
            bottom: "16px",
            zIndex: 2,
            // Styles for hover effect
            "&:hover": {
              backgroundColor: "black", // Black background on hover
              "& .MuiSvgIcon-root": {
                // Target the icon within the button
                color: "rgb(237,108,1)",
              },
            },
          }}
        >
          <ExpandMoreIcon
            sx={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", // Rotate icon
              transition: "transform 200ms ease-in-out", // Add smooth transition
            }}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CustomTextArea;
