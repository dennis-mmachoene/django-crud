import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#00003f", fontWeight: "bold" }}>
          About Our Project
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our platform! Our goal is to provide an intuitive and user-friendly experience 
          that helps users manage their projects efficiently. Whether you're organizing tasks, tracking progress, 
          or collaborating with a team, our application is designed to make your workflow smoother.
        </Typography>
        <Typography variant="body1" paragraph>
          Built using modern web technologies like React, Node.js, and Material UI, our platform ensures 
          a seamless and responsive user experience. We continuously strive to improve functionality 
          and enhance performance for our users.
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or feedback, feel free to reach out to us. Your support helps us 
          refine our product and create an even better experience.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
