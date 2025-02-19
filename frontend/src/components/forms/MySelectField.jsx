import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

export default function MySelectField(props) {
  const { label, width, name, control, options } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue="" // Ensures controlled input
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl variant="standard" sx={{ width }}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>

          <Select labelId={`${name}-label`}
            id={name}
            onChange={onChange}
            value={value || ""}
            error={!!error}
          >
            {options.map((option) => (
              <MenuItem value={option.id}>{option.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: "red" }}>
            {error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
