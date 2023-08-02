import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./global/Topbar";
import Sidebar from "./global/Sidebar";
import { MyContext } from "./MyContext";
import React, { useContext } from "react";
import Login from "./Login";
import AccountCreate from "./AccountCreate";
import Items from "./Items";
import Createbuild from "./Createbuild";
import Mybuilds from "./Mybuilds";
import Heros from "./Heros"
import HeroPage from "./HeroPage"
import UserDash from "./UserDash"
import HomePage from "./Home";


function App() {
  const [theme, colorMode] = useMode();
  const { user } = useContext(MyContext);
  console.log(user)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app"
        >
          <Sidebar />
          <main className="content">
          <Topbar />
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/Heros" element={<Heros/>} />
              <Route path="/Items" element={<Items/>} />
              <Route path="/heros/:id" element={<HeroPage/>} />
              {user !== null || undefined ? (
                <>
                  <Route path="/UserDash" element={<UserDash />} />
                  <Route path="/AccountCreate" element={<AccountCreate />} />
                  <Route path="/builds/create" element={<Createbuild />} />
                  <Route path="/builds/myBuilds" element={<Mybuilds />} />
                </>
              ) : null}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<AccountCreate />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
