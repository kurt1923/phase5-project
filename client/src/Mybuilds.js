import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  MenuItem,
  Grid,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";
import { tokens } from "./theme";
import Header from "./Header";
import { Formik, Form, FieldArray } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import background from "./pics/predwallpaper1.jpg";
import ItemsComp from "./ItemsComp";
import BuildItems from "./BuildItems";
import image from "./pics/Gideon.webp";

const Mybuilds = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const { user, setUser, isCollapsed, builds, currentBuild, setCurrentBuild } = useContext(MyContext);

  // array that matches the current user id
  const findUserBuilds = builds.filter((build) => build.user_id === user.id);

  const handleCardClick = (build) => () => {
    setCurrentBuild(build.id);
    };
    console.log(currentBuild)

  return (
    <Box
      p={"20px"}
      ml={isCollapsed ? "80px" : "270px"}
      display="flex"
      flexDirection="column"
      overflow="visible"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <Header title="My Builds" subtitle="Select one of your builds" />
      <Box
        position="relative"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        borderRadius={2}
        p={2}
        mt={2}
        boxShadow={1}
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
      >
        {findUserBuilds.map((build) => (
          <Card
            key={build.id}
            elevation={20}
            onClick={handleCardClick(build)}
            sx={{
              border: "1px solid #e1e2fe",
              flexDirection: "row",
              alignItems: "center",
              width: isNonMobile ? "200px" : "100px",
              height: isNonMobile ? "300px" : "150px",
              margin: "10px",
              borderRadius: "10px",
              boxShadow: "0 0 7px 1px #ffffff",
              cursor: "pointer",
            }}
          >
            <CardMedia
              component="img"
              image={image}
              alt={build.name}
              sx={{
                width: "100%",
                height: "60%",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 6px 6px #ffffff",
              }}
            />
            <CardContent align="center">
              <Typography style={{ color: "#ffffff" }}>
                {build.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Mybuilds;
