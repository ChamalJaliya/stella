"use client";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface CustomDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
