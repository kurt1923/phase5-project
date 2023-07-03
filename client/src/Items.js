import { Grid, Card, Typography, CardContent, CardMedia } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { Box, useTheme, Button, TextField, MenuItem } from "@mui/material";
import { CircularProgress, LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/material";
import { MyContext } from "./MyContext";
import { tokens } from "./theme";
import Header from "./Header";
import { useContext } from "react";
import React, { useState } from "react";

const Items = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { items } = useContext(MyContext);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  const formatAttributeKey = (key) => {
    const words = key.split("_");
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(" ");
  };

  return (
    <Box m="20px" ml="290px">
      <Header title="Items" subtitle="All Items" />

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              elevation={20}
              sx={{
                border: "1px solid #e1e2fe",
                backgroundColor: hoveredItemId === item.id ? "#f5f5f5" : "#e1e2fe",
                position: "relative",
                overflow: "visible", // Allow hover box to overflow card boundaries
              }}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <CardContent align="center">
                <Typography style={{ color: "#ffffff" }}>
                  {item.name}
                </Typography>

                {/* Render additional item data */}
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    padding: "10px",
                    borderRadius: "4px",
                    position: "absolute",
                    top: "-100%", // Position above the card
                    left: 0,
                    zIndex: hoveredItemId === item.id ? 1 : -1, // Show on top only when hovered
                    width: "100%",
                    opacity: hoveredItemId === item.id ? 1 : 0, // Show or hide based on hover state
                    pointerEvents: hoveredItemId === item.id ? "auto" : "none", // Enable or disable hover events
                    transition: "opacity 0.3s ease", // Add a transition effect
                    textTransform: "capitalize", // Capitalize attribute keys
                    whiteSpace: "pre-line", // Render new line characters as line breaks
                    textAlign: "left",
                  }}
                >
                  {/* Render additional item data here */}
                  {Object.entries(item).map(([key, value]) => {
                    if (key !== "id" && key !== "name" && key !== "category" && value !== 0) {
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
  );
};


export default Items;
