import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

export default function MyDatePicker({ label, width, name, control }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            value={dayjs(value).isValid() ? dayjs(value) : dayjs()} // Ensure valid date
            onChange={(newValue) => onChange(newValue ? newValue.toISOString() : "")} // Store as ISO format
            label={label}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message || "", // Ensure valid helper text
              },
            }}
            sx={{ width }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
