import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyContext = React.createContext();

function MyProvider({ children }) {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [builds, setBuilds] = useState([]);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

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


  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    navigate("/login");
  }
  
  function addNewBuild(newBuild) {
    setBuilds(prevBuilds => [...prevBuilds, newBuild]);
    setUser(prevUser => {
      const updatedUser = { ...prevUser };
      updatedUser.builds.push(newBuild);
      return updatedUser;
    });
  }
  


  return (
    <MyContext.Provider value={{ user, setUser, handleLogoutClick, items, isCollapsed, setIsCollapsed, addNewBuild, builds }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyProvider, MyContext };
