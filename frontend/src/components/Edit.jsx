import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePicker from "./forms/MyDatePicker";
import MyMultiLineField from "./forms/MyMultiLineField";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import MyMultiSelectField from "./forms/MyMultiSelectField";

const Edit = () => {
  const { id: myId } = useParams();
  const [projectManager, setProjectManager] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const hardOptions = [
    { id: "Open", name: "Open" },
    { id: "In progress", name: "In progress" },
    { id: "Completed", name: "Completed" },
  ];

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      name: "",
      start_date: dayjs(),
      end_date: dayjs(),
      comments: "",
      status: "",
      employees: [],
      projectmanager: "",
    },
  });

  const GetData = () => {
    AxiosInstance.get("projectmanager/").then((res) => setProjectManager(res.data || []));

    AxiosInstance.get("employees/").then((res) => setEmployees(res.data || []));

    AxiosInstance.get(`project/${myId}`).then((res) => {
      setValue("name", res.data.name);
      setValue("status", res.data.status);
      setValue("employees", res.data.employees || []);
      setValue("comments", res.data.comments);
      setValue("start_date", dayjs(res.data.start_date));
      setValue("end_date", dayjs(res.data.end_date));
      setValue("projectmanager", res.data.projectmanager || "");
      setLoading(false);
    });
  };

  useEffect(() => {
    if (myId) GetData();
  }, []);

  const navigate = useNavigate();

  const submission = (data) => {
    const StartDate = dayjs(data.start_date).format("YYYY-MM-DD");
    const EndDate = dayjs(data.end_date).format("YYYY-MM-DD");

    AxiosInstance.put(`project/${myId}/`, {
      name: data.name,
      projectmanager: data.projectmanager,
      employees: data.employees,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    }).then(() => navigate("/"));
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <form onSubmit={handleSubmit(submission)}>
          <Box sx={{ display: "flex", width: "100%", backgroundColor: "#00003f", marginBottom: "10px" }}>
            <Typography sx={{ marginLeft: "20px", color: "#ffffff" }}>Edit Project</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%", boxShadow: 3, padding: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "40px" }}>
              <MyTextField label="Name" name="name" control={control} placeholder="Project name" width="30%" />
              <MyDatePicker label="Start Date" name="start_date" control={control} width="30%" />
              <MyDatePicker label="End Date" name="end_date" control={control} width="30%" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <MyMultiLineField label="Comments" name="comments" control={control} placeholder="Project comments" width="30%" />
              <MySelectField label="Status" name="status" control={control} width="30%" options={hardOptions} />
              <MySelectField label="Project Manager" name="projectmanager" control={control} width="30%" options={projectManager || []} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "40px" }}>
              <MyMultiSelectField label="Employees" name="employees" control={control} width="30%" options={employees || []} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "start", marginTop: "40px" }}>
              <Button variant="contained" type="submit" sx={{ width: "30%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Edit;
