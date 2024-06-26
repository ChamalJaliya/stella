"use client";
import * as React from "react";
import { Box, IconButton } from "@mui/material";
import CustomButton from "@/client/components/CustomButton";
import CustomTextField from "@/client/components/CustomTextField";
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon

interface LLMCombinerProps {}

const LLMCombiner: React.FC<LLMCombinerProps> = () => {
  const [inputFields, setInputFields] = React.useState<string[]>(['']);

  const handleAddInput = () => {
    setInputFields([...inputFields, '']);
  };

  const handleRemoveInput = (index: number) => {
    if (inputFields.length > 1) { // Prevent removal of the last input
      setInputFields(inputFields.filter((_, i) => i !== index));
    }
  };

  return (
    <Box>
      <h3 className="pt-20">LLM Input Combiner from Celebrity Analyzer Results</h3>
      <Box
        sx={{
          padding: 2,
          border: "2px solid",
          borderColor: "rgb(210,210,210)",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            "& .MuiButton-root": { m: 1, width: "20ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {inputFields.map((_, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}> {/* Wrap TextField and IconButton */}
              <CustomTextField
                label={`Enter LLM Input ${index + 1}`}
                placeholder="LLM input from celebrity style analyser"
              />
              <IconButton 
                aria-label="delete"
                onClick={() => handleRemoveInput(index)}
                disabled={inputFields.length === 1} // Disable if only one field
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <CustomButton onClick={handleAddInput}>Add Input Box</CustomButton>
          <CustomButton>Generate</CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default LLMCombiner;