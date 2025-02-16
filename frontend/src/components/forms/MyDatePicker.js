import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

export default function MyDatePicker(props) {
  const { label, width, name, control } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={dayjs()} // Ensures date is never undefined
        render={({ field: { onChange, value } }) => (
          <DatePicker
            onChange={onChange}
            value={value || dayjs()} // Prevents undefined error
            label={label}
            sx={{ width }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
