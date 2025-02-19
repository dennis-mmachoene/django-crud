import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const { id: myId } = useParams();
  const [myData, setMyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const GetData = async () => {
      try {
        const res = await AxiosInstance.get(`project/${myId}`);
        setMyData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    GetData();
  }, [myId]);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`project/${myId}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
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
              Delete Project: {myData?.name}
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
              Are you sure you want to delete: {myData?.name}?
            </Box>
            <Box sx={{ width: "30%" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
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
