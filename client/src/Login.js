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
import image from "/home/aizen/development/code/phase5/phase5-project/client/src/pics/countess.webp"
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";


const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUser } = useContext(MyContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    }).then((res) => {
      if (res.ok) {
        // navigate("/putpage here");
        res.json().then((user) => setUser(user));
      } else {
        res.json().then((json) => {
          setError(json.errors);
          alert("incorrect email or password");
        });
      }
    });
  };

  console.log(error);

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Header title="Account Login" subtitle="Login to your builds" />
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={5}
            md={6}
            sx={{
              //use client/pics/2023-03-22.png
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
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
                  {error ? error.map(e => <p className='error' key={e}>{e}</p> ) : null}
                </Typography>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
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
                    <Link href="signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
