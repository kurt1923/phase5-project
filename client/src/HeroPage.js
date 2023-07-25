import { useParams } from "react-router-dom";
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
  LinearProgress,
} from "@mui/material";
import { tokens } from "./theme";
import Header from "./Header";
import { Formik, Form, FieldArray } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import background from "./pics/predwallpaper1.jpg";
import image from "./pics/Crunch.webp";
import AutoIcon from "@mui/icons-material/GpsFixed";
import PassiveIcon from "@mui/icons-material/RadioButtonUnchecked";
import AbilitiesIcon from "@mui/icons-material/StarBorderPurple500";
import UltimateIcon from "@mui/icons-material/Stars";
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

const HeroPage = () => {
  const { user, heros, isCollapsed, selectedHero, setSelectedHero } =
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
          color: "blue",
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
console.log(selectedHero)
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
      <Header title={`${selectedHero.name}`} subtitle="Abilities and Stats" />
      <Box
        position="relative"
        backgroundColor="rgba(0, 0, 0, 0.6)"
        borderRadius={2}
        p={2}
        mt={2}
        boxShadow={1}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "center", md: "flex-start" }}
          alignItems="flex-start" // Adjusted alignment
        >
          <CardMedia
            component="img"
            src={selectedHero.image_url}
            alt="Hero Image"
            height="100%"
            width="100%"
            sx={{
              mr: { xs: 0, md: 4 },
              objectFit: "contain",
              height: "auto",
              maxWidth: isNonMobile ? "30%" : "60%",
              borderRadius: "3px",
              boxShadow: "0 0 6px 4px #ffffff",
            }}
          />
          <Box>
            <Typography variant="h3" sx={{ mb: 2, mt: 2 }}>
              {selectedHero.name}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Role: {selectedHero.role}
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Abilities:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AutoIcon sx={{ fontSize: 21, marginRight: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginRight: 4.5 }}
                >
                  Auto:
                </Typography>
                <Typography variant="body1">{selectedHero.auto}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PassiveIcon sx={{ fontSize: 21, marginRight: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginRight: 2 }}
                >
                  Passive:
                </Typography>
                <Typography variant="body1">{selectedHero.passive}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AbilitiesIcon sx={{ fontSize: 21, marginRight: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginRight: 2 }}
                >
                  Ability1:
                </Typography>
                <Typography variant="body1">
                  {selectedHero.ability_1}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AbilitiesIcon sx={{ fontSize: 21, marginRight: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginRight: 2 }}
                >
                  Ability2:
                </Typography>
                <Typography variant="body1">
                  {selectedHero.ability_2}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AbilitiesIcon sx={{ fontSize: 21, marginRight: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginRight: 2 }}
                >
                  Ability3:
                </Typography>
                <Typography variant="body1">
                  {selectedHero.ability_3}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <UltimateIcon sx={{ fontSize: 18, marginRight: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginRight: 1.8 }}
                >
                  Ultimate:
                </Typography>
                <Typography variant="body1">
                  {selectedHero.ultimate}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
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
    </Box>
  );
};

export default HeroPage;