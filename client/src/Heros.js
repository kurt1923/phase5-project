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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { tokens } from "./theme";
import Header from "./Header";
import { Formik, Form, FieldArray } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import background from "./pics/phase2.jpg";


const Heros = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const { user, isCollapsed, heros, selectedHero, setSelectedHero } = useContext(
    MyContext
  );
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("All");
  const handleCardClick = (hero) => () => {
    navigate(`/heros/${hero.id}`);
    setSelectedHero(hero);
  };
  
// console.log(heros[1].image)
  const filteredHeroes = selectedRole === "All" ? heros : heros.filter((hero) => hero.role.includes(selectedRole));

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
      <Header title="Heroes" subtitle="Select a hero to learn more" />
      
      <FormControl variant="outlined" sx={{ ml: 8, minWidth: 200, backgroundColor: "rgba(120, 79, 277, 0.15)", maxWidth: 250  }}>
        <InputLabel htmlFor="role-filter">Filter by Role</InputLabel>
        <Select
          value={selectedRole}
          onChange={(event) => setSelectedRole(event.target.value)}
          label="Filter by Role"
          inputProps={{
            name: "role-filter",
            id: "role-filter",
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Carry">Carry</MenuItem>
          <MenuItem value="Offlane">Offlane</MenuItem>
          <MenuItem value="Midlane">Midlane</MenuItem>
          <MenuItem value="Jungle">Jungle</MenuItem>
          <MenuItem value="Support">Support</MenuItem>
        </Select>
      </FormControl>
      
      <Box
        position="relative"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        borderRadius={2}
        p={2}
        mt={2}
        mr={2}
        ml={2}
        boxShadow={1}
      >
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          {filteredHeroes.map((hero) => (
            <Grid item key={hero.id} xs={11} sm={5.6} md={3.7} lg={2.8} xl={1.87} m={1}>
              <Card
                elevation={10}
                onClick={handleCardClick(hero)}
                sx={{
                  backgroundColor: "rgba(120, 79, 277, 0.15)",
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
                  image={hero.image_url}
                  alt={hero.name}
                  sx={{
                    width: "100%",
                    height: "60%",
                    padding: "6px",
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
                    {hero.name}
                  </Typography>
                  <Typography
                    style={{
                      color: colors.grey[100],
                      fontSize: "14px",
                      textTransform: "uppercase",
                    }}
                    variant="subtitle2"
                  >
                    {hero.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Heros;