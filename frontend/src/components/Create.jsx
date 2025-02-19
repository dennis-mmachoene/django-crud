import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePicker from "./forms/MyDatePicker";
import MyMultiLineField from "./forms/MyMultiLineField";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MyMultiSelectField from "./forms/MyMultiSelectField";

const Create = () => {
  const [projectManager, setProjectManager] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const hardOptions = [
    { id: "Open", name: "Open" },
    { id: "In progress", name: "In progress" },
    { id: "Completed", name: "Completed" },
  ];

  useEffect(() => {
    let isMounted = true;
    AxiosInstance.get("projectmanager/").then((res) => {
      if (isMounted) setProjectManager(res.data);
    });

    AxiosInstance.get("employees/").then((res) => {
      if (isMounted) {
        setEmployees(res.data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    projectmanager: yup.string().required("Project Manager is required"),
    status: yup.string().required("Status is required"),
    employees: yup.array().min(1, "Pick at least one employee"),
    comments: yup.string(),
    start_date: yup.date().typeError("Start date is required").required(),
    end_date: yup
      .date()
      .typeError("End date is required")
      .required()
      .min(yup.ref("start_date"), "End date cannot be before start date"),
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      start_date: dayjs(),
      end_date: dayjs(),
      comments: "",
      status: "",
      projectmanager: "",
      employees: [],
    },
    resolver: yupResolver(schema),
  });

  const submission = (data) => {
    const StartDate = dayjs(data.start_date).format("YYYY-MM-DD");
    const EndDate = dayjs(data.end_date).format("YYYY-MM-DD");

    AxiosInstance.post("project/", {
      name: data.name,
      projectmanager: data.projectmanager,
      status: data.status,
      employees: data.employees,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <form onSubmit={handleSubmit(submission)}>
          <Box sx={{ display: "flex", width: "100%", backgroundColor: "#00003f", marginBottom: "10px", }} >
            <Typography sx={{ marginLeft: "20px", color: "#ffffff" }}>
              Create
            </Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%", boxShadow: 3, padding: 4, flexDirection: "column", }} >
            <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "40px", }}>
              <MyTextField label="Name" name="name" control={control} placeholder="Provide a project name" width="30%" />
              <MyDatePicker label="Start Date" name="start_date" control={control} width="30%" />
              <MyDatePicker label="End Date" name="end_date" control={control} width="30%"/>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <MyMultiLineField label="Comments" name="comments" control={control} placeholder="Provide a project comment" width="30%" />
              <MySelectField label="Status" name="status" control={control} width="30%" options={hardOptions} />
              <MySelectField label="Project Manager" name="projectmanager" control={control} width="30%" options={projectManager}/>
            </Box>
            <Box  sx={{ display: "flex", justifyContent: "space-around", marginTop: "40px" }} >
              <MyMultiSelectField label="Employees" name="employees" control={control} width="30%" options={employees}/>
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

export default Create;
