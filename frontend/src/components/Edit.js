import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePicker from "./forms/MyDatePicker";
import MyMultiLineField from "./forms/MyMultiLineField";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import Dayjs  from "dayjs";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from 'react-router-dom'
import DayJs from 'dayjs'


const Edit = () => {

    const myParam = useParams();
    const myId = myParam.id;


    const GetData = () => {
        AxiosInstance.get(`project/${myId}`).then((res) => {
          console.log(res.data);
          setValue('name', res.data.name)
          setValue('status', res.data.status)
          setValue('comments', res.data.comments)
          setValue('start_date', DayJs(res.data.start_date))
          setValue('end_date', DayJs(res.data.end_date))      
          
        });
      };
    
      useEffect(() => {
        console.log(myId)
        GetData();
      }, []);

   const navigate = useNavigate()

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      name: "",
      start_date: dayjs(),  
      end_date: dayjs(),
      comments: "",
      status: "", 
    },
  });

  const submission = (data) => {

    const StartDate =  Dayjs(data.start_date["$d"]).format('YYYY-MM-DD')
    const EndDate = Dayjs(data.end_date["$d"]).format('YYYY-MM-DD')
   AxiosInstance.put(
    `project/${myId}/`,{
      name: data.name,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate
    }
   ).then((res) => {
     navigate("/")
   })
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

export default Edit;
