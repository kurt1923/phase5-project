import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../Header";
import { useTheme } from "@mui/material";
import React, { useContext } from "react";
import { MyContext } from "../MyContext";

const Statbox = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, builds, heros, displayFavoriteHeroImage } =
    useContext(MyContext);
  const userBuilds = user.builds;

  const columns = [
    {
      field: "hero",
      headerName: "Hero",
      flex: 1,
      renderCell: (params) => {
        // Call displayFavoriteHeroImage function passing userBuild.hero as findHero parameter
        return displayFavoriteHeroImage(params.row.hero, 50, 50);
      },

    },
    {
      field: "title",
      headerName: "Name",
      headerAlign: "left",
      align: "left",
        flex: 1.2,
    },
    {
      field: "wins",
      headerName: "W",
      headerAlign: "center",
      align: "center",
      flex: 0,
    },
    {
      field: "losses",
      headerName: "L",
      headerAlign: "center",
      align: "center",
        flex: 0,
    },
    {
      field: "physical_power",
      headerName: "AP",
      flex: 0,
      valueGetter: (params) => {
        return params.row.total_stats?.physical_power || "0";
      },
    },
    {
      field: "magical_power",
      headerName: "MP",
      flex: 0,
      valueGetter: (params) => {
        return params.row.total_stats?.magical_power || "0";
      },
    },
    {
      field: "physical_armor",
      headerName: "Ph Armor",
      flex: 1,
      valueGetter: (params) => {
        return params.row.total_stats?.physical_armor || "0";
      },
    },
    {
      field: "magical_armor",
      headerName: "Mag Armor",
      flex: 1,
      valueGetter: (params) => {
        return params.row.total_stats?.magical_armor || "0";
      },
    },
    {
      field: "health",
      headerName: "Health",
      flex: 1,
      valueGetter: (params) => {
        return params.row.total_stats?.health || "0";
      },
    },
    {
      field: "attack_speed",
      headerName: "Attack Speed",
      flex: 1,
      valueGetter: (params) => {
        return params.row.total_stats?.attack_speed || "0";
      },
    },
    {
      field: "ability_haste",
      headerName: "Haste",
      flex: 1,
      valueGetter: (params) => {
        return params.row.total_stats?.ability_haste || "0";
      },
    },
    {
      field: "critical_strike",
      headerName: "Crit Chance",
      flex: 1,
      valueGetter: (params) => {
        return params.row.total_stats?.critical_strike || "0";
      },
    },
    {
      field: "created_at",
      headerName: "Created",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
  ];

   return (
    <Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        border={2}
        borderColor={colors.grey[900]}
        borderRadius={2}
        sx={{
          "& .MuiDataGrid-root": {
            backgroundColor: "transparent", // Set the background of the DataGrid to be clear
            border: "none",
            fontSize: "18px",
          },
          "& .MuiDataGrid-cell": {
            color: "#fff", // Set the text color to white
            borderBottom: "none",
            
          },
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-row": {
            backgroundColor: "rgba(120, 79, 211, 0.08)", // Set the background color for header and rows
          },
          "& .name-column--cell": {
            color: colors.primary[900],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(120, 79, 277, 0.15)",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "rgba(120, 79, 277, 0.15)",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "rgba(120, 79, 277, 0.15)",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: colors.grey[100],
          },
        }}
      >
        <DataGrid
          rows={userBuilds}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Statbox;
