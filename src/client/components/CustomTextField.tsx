"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { color } from "framer-motion";

// Define your custom styling
const StyledTextField = styled(TextField)({
"& label.Mui-focused": {
    color: "primary.main", // Changed to primary color on focus
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "blue",
  },
  "& .MuiInputLabel-outlined": {
    "&.Mui-focused": {
      transform: "translate(12px, -9px) scale(0.75)",
      "&.MuiInputLabel-shrink": {
        backgroundColor: "white",
        padding: "2px 12px", // Optional padding for the label
        border: "1px solid #808080", // Optional border for the label
        borderRadius: 2, // Optional rounded corners
      },
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
    },
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
    // Add this to set the background color of the input field
    "& .MuiInputBase-input": {
      backgroundColor: "white", 
    },
  },
})

interface CustomTextFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  defaultValue?: string;
  fullWidth?: boolean
  // Add more props as needed (e.g., error, helperText, variant, etc.)
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  onClick,
  placeholder,
  readOnly = false,
  onFocus,
  onBlur,
  defaultValue,
  fullWidth=true,
  ...rest
}) => {
  return (
    <StyledTextField
      label={label}
      value={value}
      onChange={onChange}
      onClick={onClick}
      fullWidth={fullWidth}
      onFocus={onFocus}
      onBlur={onBlur}
      defaultValue={defaultValue}
      placeholder={placeholder}
      inputProps={{ readOnly: readOnly ,'aria-readonly': readOnly }}
      {...rest} // Pass any other props directly to the underlying TextField
    />
  );
};

export default CustomTextField;
