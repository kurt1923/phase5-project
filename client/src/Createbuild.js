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
  const {
    user,
    setUser,
    isCollapsed,
    addNewBuild,
    builds,
    items,
    addNewBuildItem,
    setBuilds,
    currentBuild,
    setCurrentBuild,
    handleBuildEdit,
  } = useContext(MyContext);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [selectedBuildItem, setSelectedBuildItem] = useState([]);
  const noBuild = currentBuild.length === 0;
  const findCurrentBuild = builds.find((build) => build.id === currentBuild);

  const initialValues = noBuild
    ? {
        title: "",
        hero: "Gideon",
        info: "",
        user_id: user.id,
      }
    : {
        title: findCurrentBuild.title,
        hero: findCurrentBuild.hero,
        info: findCurrentBuild.info,
        user_id: findCurrentBuild.user_id,
      };

  console.log(initialValues);

  //im creating a new build with 6 build_items
  function handleFormSubmit(values) {
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
        addNewBuild(newBuild);

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
          }).then((res) => res.json());
        });

        // Wait for all build_item creations to complete
        Promise.all(buildItemIdList).then((buildItems) => {
          const updatedBuild = { ...newBuild, build_items: buildItems };
          addNewBuildItem(updatedBuild);

          console.log("Created build_items:", buildItems);
        });
        setCurrentBuild(newBuild.id);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  //this edits the current builitems by updating the item_id and then setting new state
  const handleCardClick = (itemId) => {
    const selectedBuildItemId = selectedBuildItem.id;

    fetch(`/build_items/${selectedBuildItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id: itemId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Parse the response as JSON
        } else {
          throw new Error("Failed to update build item");
        }
      })
      .then((updatedBuildItem) => {
        // Update the builds state with the updated selectedBuildItem
        const updatedBuilds = builds.map((build) => {
          if (build.id === currentBuild) {
            const updatedBuildItems = build.build_items.map((buildItem) => {
              if (buildItem.id === selectedBuildItemId) {
                return { ...buildItem, item_id: itemId }; // Only update the item_id
              }
              return buildItem;
            });
            return {
              ...build,
              build_items: updatedBuildItems,
            };
          }
          return build;
        });

        // Update the selectedBuildItem and builds state
        setSelectedBuildItem([]);
        setBuilds(updatedBuilds);
        // setUser((prevUser) => ({
        //   ...prevUser,
        //   builds: updatedBuilds,
        // }));
      })
      .catch((error) => {
        console.error("Error updating build item:", error);
      });
  };

  //this edits the current build by updating the title, hero, and info
  const handleEdit = (values) => {
    console.log("handleEdit called");
    console.log(values);
    fetch(`/builds/${currentBuild}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Parse the response as JSON
        } else {
          throw new Error("Failed to update build");
        }
      })
      .then((updatedBuild) => {
        // Update the builds state with the updated selectedBuildItem
        handleBuildEdit(updatedBuild);
      })
      .catch((error) => {
        console.error("Error updating build:", error);
      });
  };

  console.log("currentbuild id", currentBuild);
  console.log("builds state", builds);
  console.log(selectedItemIds);
  console.log(selectedBuildItem);
  console.log(findCurrentBuild);

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
        title={noBuild ? "Create Build" : `Edit: ${findCurrentBuild.title}`}
        subtitle={
          noBuild ? "Add info and Submit, then add items" : "Edit info or Items"
        }
      />
      <Formik
        onSubmit={(values) =>
          noBuild ? handleFormSubmit(values) : handleEdit(values)
        }
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
          <Form name="buildForm" onSubmit={handleSubmit}>
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
              {noBuild ? (
                <Box display="flex" justifyContent="center" m="10px" p="10px">
                  <Button
                    type="submit"
                    sx={{ backgroundColor: colors.blueAccent[300] }}
                    variant="contained"
                  >
                    Create Build
                  </Button>
                </Box>
              ) : (
                <Box display="flex" justifyContent="center" m="10px" p="10px">
                  <Button
                    type="submit"
                    sx={{ backgroundColor: colors.blueAccent[300] }}
                    variant="contained"
                  >
                    Submit new Build Info
                  </Button>
                </Box>
              )}
            </Box>
          </Form>
        )}
      </Formik>
      <BuildItems
        // buildItems={buildItems}
        items={items}
        selectedBuildItem={selectedBuildItem}
        setSelectedBuildItem={setSelectedBuildItem}
        currentBuild={currentBuild}
      />
      {selectedBuildItem.length !== 0 ? (
        <Box>
          <ItemsComp
            handleCardClick={handleCardClick}
            selectedItemIds={selectedItemIds}
          />
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: colors.grey[100] }}
          >
            Select an item to add to your build
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default Createbuild;

// import React, { useState, useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';

// const MyComponent = () => {
//   const [myState, setMyState] = useState('');
//   const location = useLocation();

//   useEffect(() => {
//     return () => {
//       // Reset the state when navigating away from the page
//       setMyState('');
//     };
//   }, [location]);

//   return (
//     <div>
//       <p>Current state: {myState}</p>
//       <Link to="/other-page">Navigate</Link>
//     </div>
//   );
// };

// export default MyComponent;
