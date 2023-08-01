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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import background from "./pics/drongo.jpg";
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
    handleBuildEdit,
    handleDeleteBuild,
    items
  } = useContext(MyContext);
  const navigate = useNavigate();
  // array that matches the current user id
  const findUserBuilds = user.builds;

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
            console.log(build.build_items)
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
          handleDeleteBuild(build.id);
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
// console.log(findUserBuilds[11])

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
      <Header title="My Builds" subtitle={user.builds.length === 0 ? "Go to Create Build to get Started " : "Select one of your builds"} />
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
          {user.builds.map((build) => (
            <Grid item key={build.id} xs={15} sm={5.4} md={3.7} lg={2.8} xl={2.27} m={1}>
              <Card
                key={build.id}
                elevation={20}
                onClick={handleCardClick(build)}
                sx={{
                  backgroundColor: "rgba(255, 125, 0, .1)",
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
                    variant="h3"
                  >
                    {build.hero}
                  </Typography>
                  <Typography
                    style={{
                      color: colors.grey[100],
                      fontSize: "16px",
                      textTransform: "uppercase",
                    }}
                    variant="subtitle2"
                  >
                    {build.title}
                  </Typography>
                </CardContent>
                {/* i want these items to run horizontal below the name and title and small sized */}
                <Box
                  display="flex"
                  justifyContent="center"
                  mt={1}
                  flexWrap="wrap"
                >
                  {build.build_items.map((build_item, index) => {
                    const item = items.find((item) => item.id === build_item.item_id);
                    return (
                      <Box
                        key={index}
                        width={48} // Set the width of each build item
                        height={48} // Set the height of each build item
                        mr={.2} 
                        mb={2}
                      >
                        {item ? (
                          <CardMedia
                            component="img"
                            image={item.image_url}
                            alt={item.name}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        ) : (
                          null
                        )}
                      </Box>
                    );
                  })}
                </Box>

                    
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
