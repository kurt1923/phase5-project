import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import image from "./pics/kallari_photo.png";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import background from "./pics/phase.jpg";
import Alert from "@mui/material/Alert";


const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUser, isCollapsed } = useContext(MyContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email").toLowerCase(),
        password: data.get("password"),
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
        navigate("/UserDash");
      } else {
        res.json().then((json) => {
          setError(json.errors);
        });
      }
    });
  };

  console.log(error);

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
      <Header title="Account Login" subtitle="Login to your builds" />
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        mt={5}
        maxWidth="1700px"
      >
        <Grid container justifyContent="center">
          <Grid
            backgroundColor="rgba(0, 0, 0, 0.5)"
            item
            xs={false}
            sm={5}
            md={6}
            lg={5}
            sx={{
              //use client/pics/2023-03-22.png
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={5}
            component={Paper}
            elevation={6}
            square
            backgroundColor="rgba(0, 0, 0, 0.5)"
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Typography component="h1" variant="h5" color="red">
                  {error
                    ? error.map((e) => (
                        <Alert severity="error" key={e}>
                          {e}
                        </Alert>
                      ))
                    : null}
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      href="signup"
                      variant="body2"
                      color="rgba(255, 255, 255, 0.7)"
                      fontSize={18}
                      onClick={() => navigate("/signup")}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
