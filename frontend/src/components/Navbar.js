import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


export default function NavBar(props) {
  const { drawerWidth, content } = props;
  const location = useLocation();
  const path = location.pathname;

  const [open, setOpen] = useState(false);

  const changeOpenStatus = () => {
    setOpen(!open);
  };

  const myDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" selected={"/" === path}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/about" selected={"/about" === path}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/create" selected={"/create" === path}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary={"Create"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* Show menu button only on small screens */}
          <IconButton
            color="inherit"
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
            onClick={changeOpenStatus}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CRUD
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar for larger screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" }, // Hide on small screens
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {myDrawer}
      </Drawer>

      {/* Sidebar for small screens */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={changeOpenStatus}
        sx={{
          display: { xs: "block", sm: "none" }, // Show only on small screens
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {myDrawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { sm: `${drawerWidth}px` }, // Push main content when drawer is permanent
        }}
      >
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
