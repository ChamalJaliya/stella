"use client";
import React from "react";
import Button from "@mui/material/Button";

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  color?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "customBlack"; // Add a custom black color option
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  icon?: React.ReactElement;
  className?: string;
  type?: "button" | "reset" | "submit";
  iconPosition?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant,
  color,
  onClick,
  size,
  disabled,
  icon,
  className,
  type,
  iconPosition = "end",
  ...otherProps
}) => {
  // Determine button styles based on color prop
  const buttonStyles =
    color === "customBlack"
      ? {
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Darker on hover
          },
        }
      : {};

  return (
    <Button
      variant={variant || "contained"}
      color={color === "customBlack" ? "inherit" : color || "primary"}
      onClick={onClick}
      size={size || "medium"}
      disabled={disabled}
      startIcon={iconPosition === "start" ? icon : undefined} // Use StartIcon/EndIcon
      endIcon={iconPosition === "end" ? icon : undefined} // for correct positioning
      className={className}
      type={type || "button"}
      sx={buttonStyles}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
