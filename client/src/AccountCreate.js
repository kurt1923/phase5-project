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


const AddAdmin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { handleAddAdmin } = useContext(MyContext);
  const initialValues = {
    email: "",
    password: ""
  };

  function updateEmployees(values) {
    fetch("/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        alert("Admin Created, please login to continue");
        navigate("/login");
        res.json().then((admin) => handleAddAdmin(admin));
      } else {
        res.json().then((json) => {
          setError(json.errors);
          alert("All fields must be filled out");
        });
      }
    });
  }

  return (
    <Box m="20px">
      <Header
        title="Add Admin....For FlatIron use only"
        subtitle="Complete Form and Submit to create your admin account and test project...In actual app admin will only be able to create other admin"
      />
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
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              ///change form color
              backgroundColor={colors.primary[50]}
              border={2}
              padding={2}
              borderColor={colors.grey[900]}
              borderRadius={2}
              sx={{
                "& .MuiInputBase-input": {
                  background: colors.primary[400],
                  color: colors.grey[100],
                  borderRadius: "4px",
                },
                "& .MuiTextField-root": {
                  color: colors.primary[100],
                },
                "& .MuiInputBase-root": {
                  background: colors.primary[200],
                  color: colors.primary[900],
                  borderRadius: "4px",
                },
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

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
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 4" }}
              />
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
                  Create Admin Account
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
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

export default AddAdmin;
