import { Box, useTheme } from "@mui/material";
import { MyContext } from "./MyContext";
import { tokens } from "./theme";
import ItemsComp from "./ItemsComp";
import { useContext } from "react";
import Header from "./Header";
import background from "./pics/predwallpaper1.jpg";
import React, { useState } from "react";

const Items = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(MyContext);
  // const [isItemsList, setIsItemsList] = useState(true); //maybe a boolean for styling?
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const handleCardClick = (itemId) => {
    console.log(itemId)
  };

  return (
    <Box
      p="20px"
      ml={isCollapsed ? "80px" : "270px"}
      display="flex"
      flexDirection="column"
      overflow="visible"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflowY: "scroll",
        height: "100vh",
      }}
    >
      <Header title="Items" subtitle="All Items" />
      <ItemsComp handleCardClick={handleCardClick} selectedItemIds={selectedItemIds} />
    </Box>
  );
};

export default Items;
