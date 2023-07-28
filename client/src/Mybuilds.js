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
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutlined
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Mybuilds = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const {
    user,
    heros,
    isCollapsed,
    builds,
    currentBuild,
    setCurrentBuild,
    setEditingBuild,
    handleBuildEdit
  } = useContext(MyContext);
  const navigate = useNavigate();
  // array that matches the current user id
  const findUserBuilds = builds.filter((build) => build.user_id === user.id);

  const handleCardClick = (build) => () => {
    setEditingBuild(false);
    navigate("/builds/create");
    setCurrentBuild(build.id);
  };
  console.log(currentBuild);

  const buildPic = (build) => {
    if (heros.length === 0) {
      // Heroes data is not available yet, show a placeholder image or loading spinner
      return image;
    }
    const heroPic = heros.find((hero) => hero.name === build.hero);
    return heroPic.image_url;
  };

console.log(user.builds)
  function updateWin(build, clickType) {
    const apiUrl = `/builds/${build.id}`;
    const newWins =
      clickType === "left" ? (build.wins += 1) : (build.wins -= 1);

    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wins: newWins
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((updatedBuild) => {
            handleBuildEdit(updatedBuild);
          });
        } else {
          res.json().then((json) => {
            console.log(json);
          });
        }
      })
      .catch((error) => {
        console.error("Error updating build:", error);
      });
  }
  
  function updateLoss(build, clickType) {
    const apiUrl = `/builds/${build.id}`;
    const newLosses =
      clickType === "left" ? (build.losses += 1) : (build.losses -= 1);

    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        losses: newLosses
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((updatedBuild) => {
            handleBuildEdit(updatedBuild);
          });
        } else {
          res.json().then((json) => {
            console.log(json);
          });
        }
      })
      .catch((error) => {
        console.error("Error updating build:", error);
      });
  }

  function updateFavorite(build) {
    const apiUrl = `/builds/${build.id}`;
    const newFavorite = !build.favorites;

    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorites: newFavorite
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((updatedBuild) => {
            handleBuildEdit(updatedBuild);
          });
        } else {
          res.json().then((json) => {
            console.log(json);
          });
        }
      })
      .catch((error) => {
        console.error("Error updating build:", error);
      });
  }

  function deleteBuild(build) {
    const shouldDelete = window.confirm("Are you sure you want to delete this build?");

    if (shouldDelete) {
      const apiUrl = `/builds/${build.id}`;

    fetch(apiUrl, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          handleBuildEdit(build);
        } else {
          res.json().then((json) => {
            console.log(json);
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting build:", error);
      });
  }
}

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
        overflow: "scroll",
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
      >
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          {findUserBuilds.map((build) => (
            <Grid item key={build.id} xs={11} sm={5.6} md={3.7} lg={2.8} xl={1.87} m={1}>
              <Card
                key={build.id}
                elevation={20}
                onClick={handleCardClick(build)}
                sx={{
                  backgroundColor: "rgba(120, 79, 223, 0.15)",
                  border: "1px solid #e1e2fe",
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)", // Add a subtle box shadow
                  transition: "box-shadow 0.3s, transform 0.2s", // Add transition effect
                  "&:hover": {
                    transform: "scale(1.07)",
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={buildPic(build)}
                  alt={image}
                  sx={{
                    width: "100%",
                    height: "60%",
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 0 6px 6px #ffffff",
                  }}
                />
                <CardContent align="center">
                  <Typography
                    style={{
                      color: colors.primary[100],
                      fontWeight: "bold",
                    }}
                    variant="h4"
                  >
                    {build.hero}
                  </Typography>
                  <Typography
                    style={{
                      color: colors.grey[100],
                      fontSize: "14px",
                      textTransform: "uppercase",
                    }}
                    variant="subtitle2"
                  >
                    {build.title}
                  </Typography>
                </CardContent>
                <Box display="flex" justifyContent="space-between" mt={0} flexWrap="wrap">
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent card click event from firing
                      updateWin(build, "left"); // Call updateWin with clickType "left"
                    }}
                    onContextMenu={(event) => {
                      event.preventDefault(); // Prevent default right-click menu
                      event.stopPropagation(); 
                      updateWin(build, "right"); 
                    }}
                  >
                    W: {build.wins}
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation(); 
                      updateLoss(build, "left"); 
                    }}
                    onContextMenu={(event) => {
                      event.preventDefault(); 
                      event.stopPropagation(); 
                      updateLoss(build, "right"); 
                    }}
                  >
                    L: {build.losses}
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation(); 
                      updateFavorite(build); 
                    }}
                  >
                    {build.favorites ? (
                      <FavoriteOutlined />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation(); 
                      deleteBuild(build); 
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Mybuilds;
