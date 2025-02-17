import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePicker from "./forms/MyDatePicker";
import MyMultiLineField from "./forms/MyMultiLineField";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import Dayjs from "dayjs";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import DayJs from "dayjs";

const Delete = () => {
  const myParam = useParams();
  const myId = myParam.id;
  const [myData, setMyData] = useState("");
  const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get(`project/${myId}`).then((res) => {
      console.log(res.data);
      setMyData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(myId);
    GetData();
  }, []);

  const navigate = useNavigate();

  const submission = (data) => {
    AxiosInstance.delete(`project/${myId}/`).then((res) => {
      navigate("/");
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              backgroundColor: "#00003f",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ marginLeft: "20px", color: "#ffffff" }}>
              Delete Project: {myData.name}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                marginBottom: "40px",
              }}
            >
              Are you sure you want to delete: {myData.name}
            </Box>
            <Box sx={{ width: "30%" }}>
              <Button
                variant="contained"
                color="error"
                onClick={submission}
                sx={{ width: "100%" }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Delete;
