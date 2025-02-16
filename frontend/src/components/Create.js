import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePicker from "./forms/MyDatePicker";
import MyMultiLineField from "./forms/MyMultiLineField";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const Create = () => {
  const { handleSubmit, reset, setValue, control } = useForm({
    defaultValues: {
      name: "",
      start_date: dayjs(),  
      end_date: dayjs(),
      comments: "",
      status: "", 
    },
  });

  const submission = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submission)}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "#00003f",
            marginBottom: "10px",
          }}
        >
          <Typography sx={{ marginLeft: "20px", color: "#ffffff" }}>
            Create
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            boxShadow: 3,
            padding: 4,
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "40px" }}>
            <MyTextField label="Name" name="name" control={control} placeholder="Provide a project name" width="30%" />
            <MyDatePicker label="Start Date" name="start_date" control={control} width="30%" />
            <MyDatePicker label="End Date" name="end_date" control={control} width="30%" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <MyMultiLineField label="Comments" name="comments" control={control} placeholder="Provide a project comment" width="30%" />
            <MySelectField label="Status" name="status" control={control} width="30%" />
            <Box sx={{ width: "30%" }}>
              <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Create;
