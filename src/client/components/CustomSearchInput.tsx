"use client";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface CustomSearchInputProps {
  placeholder: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  placeholder,
  value,
  onChange,
  label
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      // InputLabelProps={{ shrink: true }} 
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
        style: { backgroundColor: "white" }
      }}
      sx={{
        // "& .MuiOutlinedInput-root": {
        //   padding: "8px 14px",
        // },
        "& .MuiInputLabel-outlined": {
          // Target the label
          "&.Mui-focused": {
            // Styles when the input is focused
            transform: "translate(12px, -9px) scale(0.75)",
            // color: "warning.main",
            // fontWeight: "bold",
            "&.MuiInputLabel-shrink": {
              // Styles for the shrunk label (focused and has value)
              backgroundColor: "white",
              padding: "2px 12px", // Optional padding for the label
              border: "1px solid #808080", // Optional border for the label
              borderRadius: 2, // Optional rounded corners
            },
          },
        },
      }}
    />
  );
};

export default CustomSearchInput;
