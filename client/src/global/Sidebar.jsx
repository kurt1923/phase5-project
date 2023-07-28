import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Heros from "@mui/icons-material/Groups2";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ItemsIcon from "@mui/icons-material/HealthAndSafety";
import React, { useContext } from "react";
import { MyContext } from "../MyContext";
import logo1 from "../pics/newlogo.png";
import placeholder from "../pics/logo.png";

const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = () => {
    setSelected(title);
    if (onClick) {
      onClick(); // Call the onClick function if it is provided
    }
  };

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        margin: "6px 0px 6px 0px",
        //fontsize
      }}
      onClick={onClick ? handleClick : () => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    handleLogoutClick,
    user,
    setIsCollapsed,
    isCollapsed,
    setEditingBuild,
    setCurrentBuild,
    handleSidebarItemClick,
    heros,
  } = useContext(MyContext);
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const displayFavoriteHeroImage = () => {
    if (heros.length === 0) {
      // Heroes data is not available yet, show a placeholder image or loading spinner
      return (
        <img
          alt="profile-user"
          width="100px"
          height="100px"
          src={placeholder}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
      );
    }
    const heroPic = heros.find((hero) => hero.name === user.favorite_hero);
    return (
      <img
        alt="profile-user"
        width="120px"
        height="120px"
        src={heroPic.image_url}
        style={{ cursor: "pointer", borderRadius: "50%" }}
      />
    );
  };
  console.log(user);

  return (
    <Box
      position="fixed"
      zIndex={9999}
      top={0}
      left={0}
      bottom={0}
      display="flex"
      flexDirection="column"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[500]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          color: `${colors.grey[100]} !important`,
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#109FFF !important",
        },
        "& .pro-menu-item.active": {
          color: "#109FFF !important",
        },
        "&pro-item-content": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img src={logo1} alt="Logo" width={164} height={40} />

                {/* <Typography variant="h3" color={colors.grey[100]}>
                PBC
                </Typography> */}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* Conditionally display the favorite hero's image */}
                {user === null ? (
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={placeholder}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                ) : (
                  displayFavoriteHeroImage() // Call the function here
                )}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 3px 0" }}
                >
                  {user ? user.username : "Guest"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Predecessor Builds
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="PBC Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Heros"
              to="/Heros"
              icon={<Heros />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Items"
              to="/items"
              icon={<ItemsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {user !== null ? (
              <SubMenu
                title="Builds"
                color={colors.grey[100]}
                icon={<ContactsOutlinedIcon />}
                style={{
                  color: colors.grey[100],
                  fontSize: "1rem",
                }}
              >
                <Item
                  title="Dashboard"
                  to="/admin"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Create Build"
                  to={`/builds/create`}
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  onClick={handleSidebarItemClick}
                />
                <Item
                  title="My Builds"
                  to="/builds/myBuilds"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            ) : null}

            <SubMenu
              title="Account"
              color={colors.grey[100]}
              icon={<PeopleOutlinedIcon />}
              style={{
                color: colors.grey[100],
                fontSize: "1rem",
              }}
            >
              {user === null ? (
                <Item
                  title="Login"
                  to="/login"
                  icon={<MapOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              ) : (
                <MenuItem
                  title="Logout"
                  to="/login"
                  icon={<MapOutlinedIcon />}
                  onClick={handleLogoutClick}
                  style={{
                    margin: "10px 0 20px 0",
                    color: colors.grey[100],
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
