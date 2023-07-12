import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyContext = React.createContext();

function MyProvider({ children }) {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [builds, setBuilds] = useState([]);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentBuild, setCurrentBuild] = useState([]);

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
  console.log(builds);
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    navigate("/login");
  }

  function addNewBuild(newBuild) {
    setBuilds((prevBuilds) => [...prevBuilds, newBuild]);
    setUser((prevUser) => ({
      ...prevUser,
      builds: [...prevUser.builds, newBuild],
    }));
  }

  
//check later if i can use currentBuild instead of updatedBuild
  function addNewBuildItem(updatedBuild) {
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
        handleBuildEdit
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyProvider, MyContext };
