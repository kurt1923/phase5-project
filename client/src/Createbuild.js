import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { tokens } from "./theme";
import Header from "./Header";
import { Formik, Form } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import background from "./pics/predwallpaper1.jpg";
import ItemsComp from "./ItemsComp";

const Createbuild = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user, isCollapsed, addNewBuild, builds } = useContext(MyContext);
  // const [currentBuild, setCurrentBuild] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const initialValues = {
    title: "",
    hero: "Gideon",
    info: "",
    user_id: user.id,
  };

  function handleFormSubmit(values, { resetForm }) {
    fetch("/builds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newBuild) => {
          // setCurrentBuild(newBuild); // going to need some state for editing..
          //going to need a link to finish the items
          addNewBuild(newBuild);
        });
        // resetForm();
        //   navigate("/builds");
      } else {
        res.json().then((json) => {
          setError(json.errors);
        });
      }
    });
  }
  const handleCardClick = (itemId) => {
    if (selectedItemIds.includes(itemId)) {
      // Deselect item if already selected
      setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
    } else {
      // Select item if not already selected and there are less than 6 selected items
      if (selectedItemIds.length < 6) {
        setSelectedItemIds([...selectedItemIds, itemId]);
      }
    }
  };
  console.log(user.builds);
  console.log(selectedItemIds)
  return (
    <Box
      m="20px"
      ml={isCollapsed ? "80px" : "270px"}
      display="flex"
      flexDirection="column"
      overflow="visible"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflowY: "scroll",
        height: "100vh",
        position: "relative", //not sure if i need this
      }}
    >
      <Header title="Create a Build" subtitle="Create a build" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
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
              //   backdropfilter="blur(1000px)" // Add a blur filter
              //   zIndex={1}
            >
              <TextField
                fullWidth
                // variant="filled"
                type="text"
                label="Build Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{
                  gridColumn: "span 2",
                  color: colors.primary[100],
                  marginBottom: "10px",
                  fontWeight: "bolder",
                }}
              />
              <TextField
                fullWidth
                multiline={true}
                rows={5}
                // variant="filled"
                type="text"
                // placeholder="Info"
                label="Build Info"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.info}
                name="info"
                error={!!touched.info && !!errors.info}
                helperText={touched.info && errors.info}
                sx={{
                  gridColumn: "span 2",
                  color: colors.primary[100],
                  marginBottom: "10px",
                }}
              />
              <TextField
                name="hero"
                label="Hero"
                placeholder="Hero"
                select={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.hero}
                error={!!touched.hero && !!errors.hero}
                helperText={touched.hero && errors.hero}
              >
                <MenuItem value="Gideon">Gideon</MenuItem>
                <MenuItem value="Fey">Fey</MenuItem>
                <MenuItem value="Crunch">Crunch</MenuItem>
                <MenuItem value="Dekker">Dekker</MenuItem>
                <MenuItem value="Drongo">Drongo</MenuItem>
                <MenuItem value="Grux">Grux</MenuItem>
              </TextField>
              <Box display="flex" justifyContent="center" m="10px" p="10px">
                <Button
                  type="submit"
                  sx={{ backgroundColor: colors.blueAccent[300] }}
                  variant="contained"
                >
                  Create Build
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <Box>
        <ItemsComp handleCardClick={handleCardClick} />
      </Box>
    </Box>
  );
};
export default Createbuild;
