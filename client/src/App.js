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


function App() {
  const [theme, colorMode] = useMode();
  const { user, builds } = useContext(MyContext);
  

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
              <Route path="/"></Route>
              {user !== null || undefined ? (
                <>
                  <Route path="/AccountCreate" element={<AccountCreate />} />
                  <Route path="/Items" element={<Items />} />
                  <Route path={`/builds/create`} element={<Createbuild />} />
                  {/* <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/team/assign" element={<Assign />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/admin/projects" element={<Projects />} />
                  <Route
                    path="/admin/projects/editProject"
                    element={<EditProject />}
                  />
                  <Route path="/admin/addEmployee" element={<AddEmployee />} /> */}
                </>
              ) : null}
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
