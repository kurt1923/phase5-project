import { Box, useTheme } from "@mui/material";
import { MyContext } from "./MyContext";
import { tokens } from "./theme";
import ItemsComp from "./ItemsComp";
import { useContext } from "react";
import Header from "./Header";
import background from "./pics/predwallpaper1.jpg";

const Items = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(MyContext);

  return (
    <Box
      m="20px"
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
      <ItemsComp />
    </Box>
  );
};

export default Items;
