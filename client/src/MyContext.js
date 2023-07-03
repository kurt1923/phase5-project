import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyContext = React.createContext();

function MyProvider({ children }) {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    navigate("/login");
  }

  console.log(user);

  return (
    <MyContext.Provider value={{ user, setUser, handleLogoutClick, items }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyProvider, MyContext };
