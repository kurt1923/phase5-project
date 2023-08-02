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
import background from "./pics/revenant.jpg";
import ItemsComp from "./ItemsComp";
import BuildItems from "./BuildItems";
import BuildInfoComp from "./BuildInfoComp";

const Createbuild = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    user,
    heros,
    isCollapsed,
    addNewBuild,
    builds,
    items,
    setBuilds,
    currentBuild,
    setCurrentBuild,
    handleBuildEdit,
    editingBuild,
    setEditingBuild,
    setUser
  } = useContext(MyContext);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [error, setError] = useState([]);
  const [selectedBuildItem, setSelectedBuildItem] = useState([]);
  const noBuild = currentBuild.length === 0;
  const findCurrentBuild = builds.find((build) => build.id === currentBuild);
  console.log(currentBuild);
  console.log(findCurrentBuild);
  const initialValues = noBuild
    ? {
        title: "",
        hero: "Gideon",
        info: "",
        user_id: user.id,
        wins: 0,
        losses: 0,
        favorite: false,
      }
    : {
        title: findCurrentBuild.title,
        hero: findCurrentBuild.hero,
        info: findCurrentBuild.info
      };

  console.log(initialValues);

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
        console.log("Created build:", newBuild);

        // Update the build with the correct total_stats and item_specials
        const updatedBuild = {
          ...newBuild,
          total_stats: newBuild.total_stats,
          item_specials: newBuild.item_specials,
        };

        addNewBuild(updatedBuild); // Call addNewBuild with the updatedBuild
        console.log("bi");
        setCurrentBuild(updatedBuild.id);
        console.log("hi");
      })
      .catch((error) => {
        setError(error.message);
      });
    setTimeout(() => {
      setEditingBuild(false);
    }, 500);
  }

  // console.log(currentBuild);
  // console.log("builds state", builds);
  // console.log(selectedItemIds);
  // console.log(selectedBuildItem);
  // console.log(findCurrentBuild);
  // console.log("editingBuild", editingBuild);

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
          return res.json();
        } else {
          throw new Error("Failed to update build item");
        }
      })
      .then((updatedBuild) => {
        const updatedBuilds = builds.map((build) => {
          if (build.id === currentBuild) {
            const updatedBuildItems = build.build_items.map((buildItem) => {
              if (buildItem.id === selectedBuildItemId) {
                return updatedBuild.build_items.find(
                  (item) => item.id === selectedBuildItemId
                );
              }
              return buildItem;
            });
            return {
              ...build,
              build_items: updatedBuildItems,
              total_stats: updatedBuild.total_stats,
              item_specials: updatedBuild.item_specials,
            };
          }
          return build;
        });

        setSelectedBuildItem([]);
        setBuilds(updatedBuilds);
        setUser((prevUser) => {
          return {
            ...prevUser,
            builds: prevUser.builds.map((build) => {
              return build.id === updatedBuild.id ? updatedBuild : build;
            }),
          };
        });
      })
      .catch((error) => {
        console.error("Error updating build item:", error);
      });
  };

  //this edits the current build by updating the title, hero, and info
  const handleEdit = (values) => {
    const apiUrl = `/builds/${currentBuild}`; // The API endpoint URL

    console.log("API URL:", apiUrl); // Log the API URL
  
    fetch(apiUrl, {
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
        setEditingBuild(false);
        handleBuildEdit(updatedBuild);
      })
      .catch((error) => {
        console.error("Error updating build:", error);
      });
  };
console.log(currentBuild)
  return (
    <Box
      p="20px"
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
        title={
          editingBuild
            ? noBuild
              ? "Create Build"
              : `Edit: ${findCurrentBuild?.title}`
            : findCurrentBuild?.title
        }
        subtitle={
          editingBuild
            ? noBuild
              ? "Add info and Submit, then add items"
              : "Edit: Edit info or Items"
            : findCurrentBuild?.hero
        }
      />
      {editingBuild ? (
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
                  {heros.map((hero) => (
                    <MenuItem key={hero.id} value={hero.name}>
                      {hero.name}
                    </MenuItem>
                  ))}
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
      ) : (
        <BuildInfoComp
          findCurrentBuild={findCurrentBuild}
          setEditingBuild={setEditingBuild}
          isNonMobile={isNonMobile}
          colors={colors}
        />
      )}
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



// handleFormSubmit breakdown
// The fetch request is made to create a new build.
// Once the response is received, it is checked for success. If successful, the response is parsed as JSON.
// The newBuild object is added to the builds state using the addNewBuild function.
// An array of promises (buildItemIdList) is created to handle the creation of six new build item models with blank item_id fields.
// The Promise.all function is used to wait for all build item creations to complete.
// Once all build items are created, the buildItems array is received.
// The newBuild object is updated with the build_items property using the spread operator.
// The updated build is added to the builds state using the addNewBuildItem function.
// The setCurrentBuild function is called to set the current build to the ID of the new build.
// setTimeout is used to delay the execution of setEditingBuild(false) by 500 milliseconds.
// After the specified delay, setEditingBuild(false) is called to set the editing state to false.
