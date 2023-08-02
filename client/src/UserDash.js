import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import background from "./pics/kira.jpg";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import Header from "./Header";
import { tokens } from "./theme";
import Statbox from "./DashComp/Statbox";

const UserDash = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed, user, displayFavoriteHeroImage } =
    useContext(MyContext);

  const userBuilds = user.builds;
  const getMostRecentUserBuild = () => {
    if (userBuilds.length === 0) return null;
    return userBuilds.reduce((prev, current) =>
      prev.id > current.id ? prev : current
    );
  };

  const getHighestWinRate = () => {
    if (userBuilds.length === 0) return null;
    return userBuilds.reduce((prev, current) =>
      prev.win_rate > current.win_rate ? prev : current
    );
  };

  const getLowestWinRate = () => {
    if (userBuilds.length === 0) return null;
    return userBuilds.reduce((prev, current) =>
      prev.win_rate < current.win_rate ? prev : current
    );
  };


  const statBoxStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const cardstyle = {
    backgroundColor: "rgba(120, 79, 277, 0.15)",
    border: "1px solid #e1e2fe",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    transition: "box-shadow 0.3s, transform 0.2s",
    "&:hover": {
      transform: "scale(1.07)",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
    },
  };

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
      <Header title={`${user.username}`} subtitle="Build Dashboard" />
      <Box
        position="relative"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        borderRadius={2}
        p={2}
        mt={2}
        boxShadow={1}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardstyle}>
              <CardContent style={statBoxStyle}>
                <Box>
                  <Typography variant="h3">Total Builds</Typography>
                  <Typography variant="h4">{user.builds.length}</Typography>
                  <Typography variant="h4">{user.username}</Typography>
                </Box>
                {displayFavoriteHeroImage(user.favorite_hero, 90, 90)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardstyle}>
              <CardContent style={statBoxStyle}>
                <Box>
                  <Typography variant="h3">Most Recent Build</Typography>
                  {userBuilds.length === 0 ? (
                    <Typography variant="h4">N/A</Typography>
                  ) : (
                    <>
                      <Typography
                        style={{
                          color: colors.grey[100],
                          fontSize: "14px",
                          textTransform: "uppercase",
                        }}
                      >
                        {getMostRecentUserBuild().title}
                      </Typography>
                      <Typography variant="h4">
                        {getMostRecentUserBuild().created_at}
                      </Typography>
                    </>
                  )}
                </Box>
                {userBuilds.length === 0
                  ? null
                  : displayFavoriteHeroImage(getMostRecentUserBuild().hero, 90, 90)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardstyle}>
              <CardContent style={statBoxStyle}>
                <Box>
                  <Typography variant="h3">Highest Win Rate</Typography>
                  {userBuilds.length === 0 ? (
                    <Typography variant="h4">N/A</Typography>
                  ) : (
                    <>
                      <Typography
                        style={{
                          color: colors.grey[100],
                          fontSize: "14px",
                          textTransform: "uppercase",
                        }}
                      >
                        {getHighestWinRate().title}
                      </Typography>
                      <Typography variant="h4">
                        {getHighestWinRate().win_rate}
                      </Typography>
                    </>
                  )}
                </Box>
                {userBuilds.length === 0
                  ? null
                  : displayFavoriteHeroImage(getHighestWinRate().hero, 90, 90)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardstyle}>
              <CardContent style={statBoxStyle}>
                <Box>
                  <Typography variant="h3">Lowest Win Rate</Typography>
                  {userBuilds.length === 0 ? (
                    <Typography variant="h4">N/A</Typography>
                  ) : (
                    <>
                      <Typography
                        style={{
                          color: colors.grey[100],
                          fontSize: "14px",
                          textTransform: "uppercase",
                        }}
                      >
                        {getLowestWinRate().title}
                      </Typography>
                      <Typography variant="h4">
                        {getLowestWinRate().win_rate}
                      </Typography>
                    </>
                  )}
                </Box>
                {userBuilds.length === 0
                  ? null
                  : displayFavoriteHeroImage(getLowestWinRate().hero, 90, 90)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {userBuilds.length === 0 ? null :
        <Statbox />}
      </Box>
    </Box>
  );
};

export default UserDash;
