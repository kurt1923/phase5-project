import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyContext = React.createContext();

function MyProvider({ children }) {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [heros, setHeros] = useState([]);
  const navigate = useNavigate();
  const [selectedHero, setSelectedHero] = useState([])
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
  console.log(builds);
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    navigate("/login");
  }

  // function addNewUser(newUser) {
  //   const updateUsers = [...users, newUser];


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
      const updatedBuilds = prevBuilds.map((build) => {
        if (build.id === updatedBuild.id) {
          return updatedBuild;
        }
        return build;
      });
      return updatedBuilds;
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
        setSelectedHero
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyProvider, MyContext };
