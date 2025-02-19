import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Controller } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MyMultiSelectField({ control, name, label, width, options }) {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]} // Ensures a controlled input
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={{ width }}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            id={`${name}-select`}
            multiple
            value={value || []} // Ensure it's always an array
            onChange={(e) => onChange(e.target.value)}
            input={<OutlinedInput id={`${name}-multiple-chip`} label={label} />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((selectedId) => (
                  <Chip
                    key={selectedId}
                    label={options.find((option) => option.id === selectedId)?.name || selectedId}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
