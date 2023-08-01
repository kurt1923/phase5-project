import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholder from "./pics/logo.png";
import useMediaQuery from "@mui/material/useMediaQuery";


const MyContext = React.createContext();

function MyProvider({ children }) {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [heros, setHeros] = useState([]);
  const navigate = useNavigate();
  const [selectedHero, setSelectedHero] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentBuild, setCurrentBuild] = useState([]);
  const [editingBuild, setEditingBuild] = useState(false);
  const findCurrentBuild = builds.find((build) => build.id === currentBuild);


  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      } else {
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  useEffect(() => {
    fetch("/builds")
      .then((res) => res.json())
      .then((data) => setBuilds(data));
  }, []);

  useEffect(() => {
    fetch("/heros")
      .then((res) => res.json())
      .then((data) => setHeros(data));
  }, []);

  const getDefaultIsCollapsed = () => {
    const screenWidth = window.innerWidth;
    return screenWidth < 760; // Collapse sidebar at screen width less than 600px
  };

  useEffect(() => {
    // Set the initial value of isCollapsed when the component mounts
    setIsCollapsed(getDefaultIsCollapsed());

    // Update isCollapsed whenever the screen size changes
    const handleResize = () => {
      setIsCollapsed(getDefaultIsCollapsed());
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(builds);
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    navigate("/login");
  }

  const displayFavoriteHeroImage = (findHero, width, height) => {
    if (!heros || heros.length === 0) {
      // Heroes data is not available yet, show a placeholder image
      return (
        <img
          alt="profile-user"
          width="100px"
          height="100px"
          src={placeholder}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
      );
    }
    const heroPic = heros.find((hero) => hero.name === findHero);
    return (
      <img
        alt="profile-user"
        width={width}
        height={height}
        src={heroPic ? heroPic.image_url : placeholder} // Use the hero image URL if available, otherwise use the placeholder image
        style={{ cursor: "pointer", borderRadius: "50%", boxShadow: "0px 0px 10px 0px rgba(50,0,0,0.85)" }}
      />
    );
  };

  function addNewBuild(newBuild) {
    setBuilds((prevBuilds) => [...prevBuilds, newBuild]);
    setUser((prevUser) => ({
      ...prevUser,
      builds: [...prevUser.builds, newBuild],
    }));
  }

  // check later if i can use currentBuild instead of updatedBuild
  function addNewBuildItem(updatedBuild) {
    setBuilds((prevBuilds) => {
      const updatedBuilds = prevBuilds.map((build) => {
        if (build.id === updatedBuild.id) {
          return {
            ...build,
            total_stats: updatedBuild.total_stats,
            item_specials: updatedBuild.item_specials,
          };
        }
        return build;
      });
      return updatedBuilds;
    });
  }

  ////same code replace this with the one above
  function handleBuildEdit(updatedBuild) {
    setBuilds((prevBuilds) => {
      return prevBuilds.map((build) => {
        return build.id === updatedBuild.id ? updatedBuild : build;
      });
    });
  
    setUser((prevUser) => {
      return {
        ...prevUser,
        builds: prevUser.builds.map((build) => {
          return build.id === updatedBuild.id ? updatedBuild : build;
        }),
      };
    });
  }

  function handleDeleteBuild(buildId) {
    setBuilds((prevBuilds) => {
      return prevBuilds.filter((build) => build.id !== buildId);
    });
    setUser((prevUser) => {
      return {
        ...prevUser,
        builds: prevUser.builds.filter((build) => build.id !== buildId),
      };
    });
  }



  const handleSidebarItemClick = () => {
    setEditingBuild(true); // Set the editingBuild state to true
    setCurrentBuild([]); // Reset the currentBuild state to an empty array
  };

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        handleLogoutClick,
        items,
        isCollapsed,
        setIsCollapsed,
        addNewBuild,
        builds,
        setBuilds,
        addNewBuildItem,
        currentBuild,
        setCurrentBuild,
        handleBuildEdit,
        editingBuild,
        setEditingBuild,
        handleSidebarItemClick,
        findCurrentBuild,
        heros,
        selectedHero,
        setSelectedHero,
        displayFavoriteHeroImage,
        handleDeleteBuild
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyProvider, MyContext };
