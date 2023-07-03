import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { MyContext } from "../MyContext";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { handleLogoutClick, user } = useContext(MyContext);
  const navigate = useNavigate();

  function home() {
    navigate("/");
  }

  function login() {
    navigate("/login");
  }

  return (
    <Box
    position="fixed"
    top={0}
    left={0}
    right={0}
    display="flex"
    justifyContent="right"
    p={2}
    backgroundColor={colors.primary[500]}
    zIndex={2}
  >
      <Box display="flex">
        <Tooltip title="Settings">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <Tooltip title="Home">
          <IconButton onClick={home}>
            <HomeOutlinedIcon />
          </IconButton>
        </Tooltip>

        {user === null ? (
          <Tooltip title="Login">
            <IconButton onClick={login}>
              <PersonOutlinedIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Logout">
            <IconButton onClick={handleLogoutClick}>
              <PersonOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
