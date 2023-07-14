import {
  Grid,
  Box,
  CardContent,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import image from "./pics/countess.webp";
import React, { useContext, useState } from "react";
import { MyContext } from "./MyContext";

const BuildItems = ({
  buildItems,
  selectedBuildItem,
  setSelectedBuildItem,
  currentBuild,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const { items, builds } = useContext(MyContext);
  const titles = [
    "Crest",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Consumable",
  ];

  //access the build_items array in the currentBuild object
  const findCurrentBuild = builds.find((build) => build.id === currentBuild);
  const currentBuildItems = findCurrentBuild
    ? findCurrentBuild.build_items
    : [];
  

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };
  const handleCardClick = (itemId) => {
    if (selectedBuildItem === itemId) {
      // Deselect the item if it's already selected
      setSelectedBuildItem([]);
    } else {
      // Select the clicked item
      setSelectedBuildItem(itemId);
    }
  };

  const formatAttributeKey = (key) => {
    const words = key.split("_");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  return (
    <Box
      position="relative"
      backgroundColor="rgba(0, 0, 0, 0.5)" // transparent background color
      borderRadius={2}
      p={3}
      mx={2}
      mt={2}
      boxShadow={1}
    >
      <Box
        m="15px 15px 15px 15px"
        display="flex"
        justifyContent="center"
        sx={{ flexWrap: "wrap" }}
      >
        <Grid
          container
          spacing={2}
          mr={8}
          ml={8}
          sx={{ justifyContent: "center", flexWrap: "wrap" }}
        >
          {currentBuildItems.map((buildItem, index) => {
            const item = items.find((item) => item.id === buildItem.item_id);
            const title = titles[index % titles.length];
            return (
              <Grid key={index}>
                {item ? (
                  <Card
                    elevation={20}
                    sx={{
                      border: "1px solid #e1e2fe",
                      backgroundColor:
                        hoveredItemId === buildItem.item_id
                          ? "#f5f5f5"
                          : "#e1e2fe",
                      position: "relative",
                      width: "100px",
                      height: "100px",
                      margin: "10px",
                      paddingTop: "80%", // 1:1 Aspect Ratio
                      overflow: "visible", // Allow hover box to overflow card boundaries
                    }}
                    onMouseEnter={() => handleMouseEnter(buildItem.item_id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleCardClick(buildItem)}
                    style={{
                      // Add selected styles if the item is selected
                      boxShadow:
                        selectedBuildItem === buildItem
                          ? "0 0 6px 6px red"
                          : "none",
                    }}
                  >
                    <CardContent align="center">
                      {/* <Typography style={{ color: "#ffffff" }}>
                      {item.name}
                    </Typography> */}
                      <CardMedia
                        component="img"
                        image={image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover", // Maintain the aspect ratio and cover the entire box
                          boxShadow:
                            hoveredItemId === item.id
                              ? "0 0 6px 6px #ffffff"
                              : "none",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          position: "absolute",
                        }}
                      />
                      <Typography style={{ color: "#ffffff" }}>
                        {title} {/* Render the title */}
                      </Typography>
                      {/* Render additional item data */}
                      <Box
                        sx={{
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          padding: "10px",
                          borderRadius: "4px",
                          position: "absolute",
                          top: "100%", // Position above the card
                          left: "-100%",
                          zIndex: hoveredItemId === item.id ? 1 : -1, // Show on top only when hovered
                          opacity: hoveredItemId === item.id ? 1 : 0, // Show or hide based on hover state
                          pointerEvents:
                            hoveredItemId === item.id ? "auto" : "none", // Enable or disable hover events
                          transition: "opacity 0.3s ease", // Add a transition effect
                          textTransform: "capitalize", // Capitalize attribute keys
                          whiteSpace: "pre-line", // Render new line characters as line breaks
                          textAlign: "left",
                          width: "300px", //was 100%
                          overflow: "auto",
                          zIndex: 99999, // Allow hover box to overflow card boundaries
                        }}
                      >
                        {/* Render additional item data */}
                        {Object.entries(item).map(([key, value]) => {
                          if (
                            key !== "id" &&
                            key !== "category" &&
                            value !== 0
                          ) {
                            return (
                              <Typography variant="body2" key={key}>
                                {formatAttributeKey(key)}: {value}
                              </Typography>
                            );
                          }
                          return null;
                        })}
                      </Box>
                    </CardContent>
                  </Card>
                ) : (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #e1e2fe",
                      backgroundColor: "#e1e2fe",
                      width: "100px",
                      height: "100px",
                      margin: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" color="primary">
                      Add Item
                    </Typography>
                  </Box>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default BuildItems;
