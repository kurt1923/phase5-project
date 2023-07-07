import {
  Box,
  useTheme,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import { MyContext } from "./MyContext";
import { tokens } from "./theme";
import { useContext } from "react";
import React, { useState } from "react";
import image from "./pics/countess.webp";

const ItemsComp = ( {handleCardClick} ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { items, user } = useContext(MyContext);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCrestItems, setShowCrestItems] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) => {
    const categoryFilter =
      selectedCategories.length === 0 ||
      selectedCategories.every((category) => item.category.includes(category));

    const searchFilter = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const classificationFilter =
      !showCrestItems || item.classification === "Crest";

    return categoryFilter && searchFilter && classificationFilter;
  });

  const categoriesSet = new Set();
  items.forEach((item) => {
    Object.keys(item).forEach((attribute) => {
      if (
        attribute !== "id" &&
        attribute !== "classification" &&
        attribute !== "category" &&
        attribute !== "name" &&
        attribute !== "special"
      ) {
        categoriesSet.add(attribute);
      }
    });
  });

  const categories = Array.from(categoriesSet);
  

  const formatCheckboxLabel = (attribute) => {
    const words = attribute.split("_");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setShowCrestItems(false);
  };

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
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
      <Box m="0px 0 0 0" display="flex" justifyContent="center">
        <TextField
          value={searchTerm}
          onChange={handleSearchChange}
          label="Search"
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {},
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-root": {
                border: "none",
              },
            },
          }}
        />
      </Box>
      {/* Add filtering checkboxes */}
      <Box
        m="15px 15px 15px 15px"
        display="flex"
        justifyContent="center"
        sx={{ flexWrap: "wrap" }}
      >
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                style={{
                  color: "white", // Customize the checkbox color here
                }}
              />
            }
            label={formatCheckboxLabel(category)}
            // style={{
            //   color: "#333", // Customize the checkbox color here
            // }}
          />
        ))}

        {/* Antiheal checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategories.includes("antiheal")}
              onChange={() => handleCategoryChange("antiheal")}
            />
          }
          label="Antiheal"
        />

        {/* Show Crest Items checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={showCrestItems}
              onChange={(event) => setShowCrestItems(event.target.checked)}
            />
          }
          label="Show Crest Items"
        />
        <Button onClick={handleClearFilters} style={{ color: "white" }}>
          Clear Filters
        </Button>
      </Box>
      <Box
        m="15px 15px 15px 15px"
        display="flex"
        justifyContent="center"
        sx={{ flexWrap: "wrap" }}
      >
        <Grid container spacing={2} mr={8} ml={8} sx={{ flexWrap: "wrap" }}>
          {filteredItems
            .filter((item) => {
              if (selectedCategories.length === 0) {
                return true; // Display all items when no categories are selected
              } else {
                return selectedCategories.every((category) =>
                  item.category.includes(category)
                );
              }
            })
            .map((item) => (
              <Grid key={item.id}>
                <Card
                  elevation={20}
                  sx={{
                    border: "1px solid #e1e2fe",
                    backgroundColor:
                      hoveredItemId === item.id ? "#f5f5f5" : "#e1e2fe",
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    margin: "10px",
                    paddingTop: "80%", // 1:1 Aspect Ratio
                    overflow: "visible", // Allow hover box to overflow card boundaries
                  }}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleCardClick(item.id)}
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
                          key !== "name" &&
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
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ItemsComp;
