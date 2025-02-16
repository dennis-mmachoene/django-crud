import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
export default function MySelectField(props) {
    const { label, width, name, control } = props;
  
    return (
      <FormControl variant="standard" sx={{ width }}>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue="" // Ensures controlled input
          render={({ field: { onChange, value } }) => (
            <Select labelId={`${name}-label`} id={name} onChange={onChange} value={value || ""}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In project">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          )}
        />
      </FormControl>
    );
  }
  