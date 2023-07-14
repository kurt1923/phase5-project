import { Grid, Card, CardContent, Typography, Button, CardMedia, Box } from "@mui/material";
import image from "./pics/Gideon.webp";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";



const BuildInfoComp = ({colors, isNonMobile}) => {

    const {
        setEditingBuild,
        findCurrentBuild
      } = useContext(MyContext);

      console.log(findCurrentBuild)
      

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
          {/* Left column: Build card */}
          <Grid item xs={6}>
          <Card
            // key={findCurrentBuild.id}
            elevation={20}
            sx={{
              border: "1px solid #e1e2fe",
              flexDirection: "row",
              alignItems: "center",
              width: isNonMobile ? "200px" : "100px",
              height: isNonMobile ? "300px" : "150px",
              margin: "10px",
              borderRadius: "10px",
              boxShadow: "0 0 7px 1px #ffffff",
              cursor: "pointer",
            }}
          >
            <CardMedia
              component="img"
              image={image}
            //   alt={findCurrentBuild.name}
              sx={{
                width: "100%",
                height: "60%",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 6px 6px #ffffff",
              }}
            />
            <CardContent align="center">
              <Typography style={{ color: "#ffffff" }}>
                {findCurrentBuild?.title}
              </Typography>
            </CardContent>
          </Card>
          </Grid>
    
          {/* Right column: Blank card */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                {/* Blank card content */}
                <Typography variant="h5">Blank Card</Typography>
                {/* ... */}
              </CardContent>
            </Card>
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