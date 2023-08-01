import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "./theme";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(MyContext);
  return (
    <Box mb="30px" mt={12} ml={9}>
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0px 0 5px 0" }}
        style={{
          textShadow: "0 0 10px rgba(255, 151, 0, 1)",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h3"
        color={colors.grey[100]}
        style={{
          textShadow: "0 0 10px rgba(255, 151, 0, 1)",
          textTransform: "uppercase"
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
