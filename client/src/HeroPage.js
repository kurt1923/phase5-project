import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  styled,
  tooltipClasses,
  CardMedia,
  Tooltip,
} from "@mui/material";
import Header from "./Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import background from "./pics/morighesh.jpg";
import AutoIcon from "@mui/icons-material/GpsFixed";
import PassiveIcon from "@mui/icons-material/RadioButtonUnchecked";
import AbilitiesIcon from "@mui/icons-material/StarBorderPurple500";
import UltimateIcon from "@mui/icons-material/Stars";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

const HeroPage = () => {
  const { isCollapsed, selectedHero, setSelectedHero } =
    useContext(MyContext);
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:800px)");

  // Fetch the hero details based on the ID
  useEffect(() => {
    fetch(`/heros/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch hero data");
        }
      })
      .then((data) => {
        setSelectedHero(data);
      })
      .catch((error) => {
        console.error("Error fetching hero data:", error);
      });
  }, [id]);

  const renderDashes = (value) => {
    const dashes = Array.from({ length: value }, (_, index) => (
      <span
        key={index}
        style={{
          color: "rgba(120, 79, 223, 0.85)",
          marginRight: "4px",
          fontWeight: "bold",
          fontSize: "1.6rem",
        }}
      >
        <DonutSmallIcon />
      </span>
    ));

    return dashes;
  };
  console.log(selectedHero);
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
        minHeight: "100vh",
        position: "relative",
        overflow: "scroll",
      }}
    >
      <Header title={`${selectedHero.name}`} subtitle="Abilities and Stats" />
      <Box
        position="relative"
        backgroundColor="rgba(0, 0, 0, 0.6)"
        borderRadius={2}
        p={2}
        mt={2}
        boxShadow={1}
        display="flex"
        flexDirection="column"
        // Add breakpoints to change the size based on screen width
        sx={{
          width: "100%", // Fills the available width
          maxWidth: "880px", // Set a maximum width for large screens
          margin: "0 auto", // Center horizontally
        }}
      >
        <Grid container alignItems="center" spacing={1} justifyContent="center">
          {/* Hero Image */}
          <Grid item xs={6} md={4} lg={4} xl={5}>
            <Typography variant="h2" sx={{ mb: 1, }} textAlign="center">
              {selectedHero.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 4, fontWeight: "bold" }}
              textAlign="center"
            >
              Role: {selectedHero.role}
            </Typography>
            <CardMedia
              component="img"
              src={selectedHero.image_url}
              alt="Hero Image"
              height="80%"
              width="80%"
              sx={{
                objectFit: "contain",
                borderRadius: "3px",
                boxShadow: "0 0 6px 4px #ffffff",
              }}
            />
          </Grid>
          {/* Hero Info */}
          <Grid item xs={12} md={6} lg={8}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ padding: 3 }}>
                {/* Abilities */}
                <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }} textAlign="center">
                  Abilities:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <LightTooltip
                    title={selectedHero.auto}
                    enterTouchDelay={0}
                    placement="top"
                    arrow
                    boxShadow={1}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        m: 1,
                      }}
                    >
                      <Paper sx={{ p: 2, bgcolor: "rgba(120, 79, 223, 0.35)" }}>
                        <AutoIcon fontSize="large" />
                      </Paper>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        Auto
                      </Typography>
                    </Box>
                  </LightTooltip>
                  <LightTooltip
                    title={selectedHero.passive}
                    enterTouchDelay={0}
                    placement="top"
                    arrow
                    boxShadow={1}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        m: 1,
                      }}
                    >
                      <Paper sx={{ p: 2, bgcolor: "rgba(120, 79, 223, 0.35)" }}>
                        <PassiveIcon fontSize="large" />
                      </Paper>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        Passive
                      </Typography>
                    </Box>
                  </LightTooltip>
                  <LightTooltip
                    title={selectedHero.ability_1}
                    enterTouchDelay={0}
                    placement="top"
                    arrow
                    boxShadow={1}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        m: 1,
                      }}
                    >
                      <Paper sx={{ p: 2, bgcolor: "rgba(120, 79, 223, 0.35)" }}>
                        <AbilitiesIcon fontSize="large" />
                      </Paper>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        Ability 1
                      </Typography>
                    </Box>
                  </LightTooltip>
                  <LightTooltip
                    title={selectedHero.ability_2}
                    enterTouchDelay={0}
                    placement="top"
                    arrow
                    boxShadow={1}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        m: 1,
                      }}
                    >
                      <Paper sx={{ p: 2, bgcolor: "rgba(120, 79, 223, 0.35)" }}>
                        <AbilitiesIcon fontSize="large" />
                      </Paper>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        Ability 2
                      </Typography>
                    </Box>
                  </LightTooltip>
                  <LightTooltip
                    title={selectedHero.ability_3}
                    enterTouchDelay={0}
                    placement="top"
                    arrow
                    boxShadow={1}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        m: 1,
                      }}
                    >
                      <Paper sx={{ p: 2, bgcolor: "rgba(120, 79, 223, 0.35)" }}>
                        <AbilitiesIcon fontSize="large" />
                      </Paper>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        Ability 3
                      </Typography>
                    </Box>
                  </LightTooltip>
                  <LightTooltip
                    title={selectedHero.ultimate}
                    enterTouchDelay={0}
                    placement="top"
                    arrow
                    boxShadow={1}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        m: 1,
                      }}
                    >
                      <Paper sx={{ p: 2, bgcolor: "rgba(120, 79, 223, 0.35)" }}>
                        <UltimateIcon fontSize="large" />
                      </Paper>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        Ultimate
                      </Typography>
                    </Box>
                  </LightTooltip>
                </Box>
              </Box>
              {/* Stats */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgba(15, 15, 15, 0.55)",
                  margin: "auto",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 6px 4px #ffffff",
                  /* Remove the following two properties to align stats to the left */
                  // alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
                  Stats:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", marginRight: 1 }}
                  >
                    Basic Attack:
                  </Typography>
                  <Typography variant="body1">
                    {renderDashes(selectedHero.basic_attack)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", marginRight: 1 }}
                  >
                    Ability Power:
                  </Typography>
                  <Typography variant="body1">
                    {renderDashes(selectedHero.ability_power)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", marginRight: 1 }}
                  >
                    Durability:
                  </Typography>
                  <Typography variant="body1">
                    {renderDashes(selectedHero.durability)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", marginRight: 1 }}
                  >
                    Mobility:
                  </Typography>
                  <Typography variant="body1">
                    {renderDashes(selectedHero.mobility)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", marginRight: 1 }}
                  >
                    Difficulty:
                  </Typography>
                  <Typography variant="body1">
                    {renderDashes(selectedHero.difficulty)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HeroPage;
