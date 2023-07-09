import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  MenuItem,
  Grid,
  CardContent,
} from "@mui/material";
import { tokens } from "./theme";
import Header from "./Header";
import { Formik, Form, FieldArray } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import background from "./pics/predwallpaper1.jpg";
import ItemsComp from "./ItemsComp";
import BuildItems from "./BuildItems";
import image from "./pics/countess.webp";

const Createbuild = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user, isCollapsed, addNewBuild, builds, items } =
    useContext(MyContext);
  const [currentBuildId, setCurrentBuildId] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [selectedBuildItem, setSelectedBuildItem] = useState([]);
  const [buildItems, setBuildItems] = useState([]); //this is going to be an array of objects [{build_id: 1, item_id: 1}, {build_id: 1, item_id: 2}
  const initialValues = {
    title: "",
    hero: "Gideon",
    info: "",
    user_id: user.id,
  };

  function handleFormSubmit(values, { resetForm }) {
    console.log("handleFormSubmit called");

    fetch("/builds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Build submission failed");
        }
      })
      .then((newBuild) => {
        setCurrentBuildId(newBuild.id);

        // Create 6 new build_item models with blank item_id fields
        const buildItemIdList = Array.from({ length: 6 }).map(() => {
          const randomItemId = Math.floor(Math.random() * 50) + 1;
          return fetch("/build_items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              build_id: newBuild.id,
              item_id: randomItemId,
            }),
          })
            .then((res) => res.json())
            .then((newBuildItem) => newBuildItem);
        });

        // Wait for all build_item creations to complete
        Promise.all(buildItemIdList).then((buildItems) => {
          // Update the buildItems state with the newly created build_items
          setBuildItems(buildItems);

          // Perform any further actions with the created build_items if needed
          console.log("Created build_items:", buildItems);
        });
        setCurrentBuildId(newBuild.id);
        addNewBuild(newBuild);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  console.log(currentBuildId);
  console.log(user.builds);
  console.log(selectedItemIds);
  console.log(selectedItems);
  console.log(buildItems);
  // const handleCardClick = (itemId) => {
  //   if (selectedItemIds.includes(itemId)) {
  //     // Deselect item if already selected
  //     setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
  //   } else {
  //     // Select item if not already selected and there are less than 6 selected items
  //     if (selectedItemIds.length < 6) {
  //       setSelectedItemIds([...selectedItemIds, itemId]);
  //     }
  //   }
  // };
  // const handleCardClick = (itemId) => {
  //   if (selectedItemIds.includes(itemId)) {
  //     // Deselect item if already selected
  //     setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
  //     setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
  //   } else {
  //     // Select item if not already selected and there are less than 6 selected items
  //     if (selectedItemIds.length < 6) {
  //       const selectedItem = items.find((item) => item.id === itemId);
  //       setSelectedItemIds([...selectedItemIds, itemId]);
  //       setSelectedItems([...selectedItems, selectedItem]);
  //     }
  //   }
  // };
  const handleCardClick = (itemId) => {
    if (selectedItemIds === itemId) {
      // Deselect the item if it's already selected
      setSelectedItemIds(null);
    } else {
      // Select the clicked item
      setSelectedItemIds(itemId);
    }
  };

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
      <Header
        title="Create a Build"
        subtitle={
          currentBuildId ? "Build ID: " + currentBuildId : "Create a build"
        }
      />
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
              {currentBuildId === null ? (
                <Box display="flex" justifyContent="center" m="10px" p="10px">
                  <Button
                    type="submit"
                    sx={{ backgroundColor: colors.blueAccent[300] }}
                    variant="contained"
                  >
                    Create Build
                  </Button>
                </Box>
              ) : null}
            </Box>
          </Form>
        )}
      </Formik>
      {/* <Header title="Add Build Items" subtitle="All Items" /> */}
      <BuildItems
        buildItems={buildItems}
        items={items}
        selectedBuildItem={selectedBuildItem}
        setSelectedBuildItem={setSelectedBuildItem}
      />
      <Box mt={4}>
        {/* <Grid container spacing={2} mr={8} ml={8} sx={{ flexWrap: "wrap" }}>
          {selectedItems.map((item) => (
            <Grid key={item.id}>
              <Box
                sx={{
                  border: "1px solid #e1e2fe",
                  backgroundColor: "#e1e2fe",
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  margin: "10px",
                  paddingTop: "80%", // 1:1 Aspect Ratio
                  overflow: "hidden",
                }}
              >
                <CardContent align="center">
                  <Typography style={{ color: "#ffffff" }}>
                    {item.name}
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          ))}
        </Grid> */}
      </Box>
      <Box>
        <ItemsComp
          handleCardClick={handleCardClick}
          selectedItemIds={selectedItemIds}
        />
      </Box>
    </Box>
  );
};
export default Createbuild;
