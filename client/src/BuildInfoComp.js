import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
} from "@mui/material";
import image from "./pics/Gideon.webp";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";

const BuildInfoComp = ({ colors, isNonMobile }) => {
  const { setEditingBuild, findCurrentBuild, heros } = useContext(MyContext);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check if currentBuild is not present, and navigate away to '/builds/create'
    if (!findCurrentBuild) {
      navigate("/builds/myBuilds");
    }
  }, [findCurrentBuild, navigate]);

  // useEffect(() => {
  //   // Check if findCurrentBuild is not null, and set loading to false
  //   if (findCurrentBuild) {
  //     setLoading(false);
  //   }
  // }, [findCurrentBuild]);

  const buildPic = (findCurrentBuild) => {
    if (heros.length === 0) {
      // Heroes data is not available yet, show a placeholder image or loading spinner
      return image;
    }
    const heroPic = heros.find((hero) => hero.name === findCurrentBuild.hero);
    return heroPic.image_url;
  };
  console.log(findCurrentBuild);
  if (!findCurrentBuild) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      position="relative"
      backgroundColor="rgba(0, 0, 0, 0.6)" // transparent background color
      borderRadius={2}
      p={3}
      mx={2}
      mt={2}
      boxShadow={1}
    >
      <Grid container spacing={2}>
        {/* First row: Image and Info */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Image */}
            <Grid item xs={12} md={3}>
              <img
                src={buildPic(findCurrentBuild)}
                alt="Build Image"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "3px",
                  borderRadius: "5px",
                  boxShadow: "0 0 6px 6px #ffffff",
                }}
              />
            </Grid>

            {/* Info */}
            <Grid item xs={12} md={9}>
              <Box padding="10px">
                <Typography
                  variant="h3"
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "10px",
                    borderBottom: "2px solid #ffffff",
                    paddingBottom: "5px",
                  }}
                >
                  Build Info
                </Typography>
                <Typography
                  variant="body1"
                  key={findCurrentBuild.id}
                  style={{ color: "#ffffff", textAlign: "center" }}
                >
                  {findCurrentBuild?.info}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* Second row: Stats and Specials */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Stats */}
            <Grid item xs={12} md={3}>
              <Box padding="10px">
                <Typography
                  variant="h3"
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "10px",
                    borderBottom: "2px solid #ffffff",
                    paddingBottom: "5px",
                  }}
                >
                  Stats
                </Typography>
                {Object.entries(findCurrentBuild.total_stats).map(
                  ([key, value]) => (
                    <Typography
                      key={key}
                      variant="body1"
                      style={{ color: "#ffffff", textAlign: "center" }}
                    >
                      {`${key}: ${value}`}
                    </Typography>
                  )
                )}
              </Box>
            </Grid>
            {/* Specials */}
            <Grid item xs={12} md={9}>
              <Box padding="10px">
                <Typography
                  variant="h3"
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "10px",
                    borderBottom: "2px solid #ffffff",
                    paddingBottom: "5px",
                  }}
                >
                  Specials
                </Typography>
                {findCurrentBuild.item_specials.map((item, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    style={{ color: "#ffffff", textAlign: "center" }}
                  >
                    <strong>{item.Special.split(":")[0]}</strong>:{" "}
                    {item.Special.split(":")[1]}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" m="10px" p="10px">
        <Button
          type="submit"
          sx={{ backgroundColor: colors.blueAccent[300] }}
          variant="contained"
          onClick={() => setEditingBuild(true)}
        >
          Edit Info
        </Button>
      </Box>
    </Box>
  );
};

export default BuildInfoComp;
