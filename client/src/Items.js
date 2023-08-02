import { Box, useTheme } from "@mui/material";
import { MyContext } from "./MyContext";
import ItemsComp from "./ItemsComp";
import { useContext } from "react";
import Header from "./Header";
import background from "./pics/twinblast.jpg";
import React, { useState } from "react";

const Items = () => {
  const theme = useTheme();
  const { isCollapsed } = useContext(MyContext);
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
      <Header title="Items" subtitle="Search Items" />
      <ItemsComp handleCardClick={handleCardClick} selectedItemIds={selectedItemIds} />
    </Box>
  );
};

export default Items;
