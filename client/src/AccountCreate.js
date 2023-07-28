import { Box, useTheme, Button, TextField, MenuItem } from "@mui/material";
import { tokens } from "./theme";
import Header from "./Header";
import { Formik, Form } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { MyContext } from "./MyContext";
import background from "./pics/predwallpaper1.jpg";

const AccountCreate = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { isCollapsed, setUser, user, heros } = useContext(MyContext);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    favorite_hero: "",
  };
console.log(initialValues)
  function updateEmployees(values) {
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        alert("Admin Created, please login to continue");
        navigate("/login");
        res.json().then((user) => setUser(user));
      } else {
        res.json().then((json) => {
          setError(json.errors);
          alert("All fields must be filled out");
        });
      }
    });
  }

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
      <Header
        title="Create Account"
        subtitle="Complete Form and Submit to create your account"
      />
      <Box
        display="flex"
        justifyContent="center"
        marginTop={5}
        // alignItems="center"
        height="100%" // Ensures the box takes full height of the screen
      >
        <Typography component="h1" variant="h5" color="red">
          {" "}
          {error ? "Errors:" + error.map((e) => e).join(", ") : null}
        </Typography>

        <Formik
          onSubmit={updateEmployees}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                position="relative"
                backgroundColor="rgba(0, 0, 0, 0.6)" // transparent background color
                borderRadius={2}
                p={3}
                mx={2}
                mt={2}
                boxShadow={1}
                maxWidth={isNonMobile ? "600px" : "100%"}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{
                    gridColumn: "span 2",
                    color: colors.primary[100],
                    marginBottom: "10px",
                    fontWeight: "bolder",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{
                    gridColumn: "span 2",
                    color: colors.primary[100],
                    marginBottom: "10px",
                    fontWeight: "bolder",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: "span 2",
                    color: colors.primary[100],
                    marginBottom: "10px",
                    fontWeight: "bolder",
                  }}
                />
                <TextField
                  name="favorite_hero"
                  label="Favorite Hero"
                  fullWidth
                  placeholder="Hero"
                  select={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.favorite_hero}
                  error={!!touched.favorite_hero && !!errors.favorite_hero}
                  helperText={touched.favorite_hero && errors.favorite_hero}
                  sx={{
                    gridColumn: "span 2",
                    color: colors.primary[100],
                    marginBottom: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  {heros.map((hero) => (
                    <MenuItem key={hero.id} value={hero.name}>
                      {hero.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Box
                  display="flex"
                  justifyContent="center"
                  m="10px"
                  p="10px"
                  sx={{ gridColumn: 4 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: colors.blueAccent[300] }}
                  >
                    Create Account
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  // firstname: yup.string().required("required"),
  // lastname: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // password: yup
  //   .string()
  //   .min(8, "Password must be at least 8 characters")
  //   .required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // address1: yup.string().required("required"),
});

export default AccountCreate;
