import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "client", headerName: "Nom Client", width: 300 },
  {
    field: "inbox",
    headerName: "Inbox",
    // type: "number",
    width: 100,
  },
  {
    field: "archive",
    headerName: "Archive",
    // type: "number",
    width: 100,
  },
  {
    field: "erreur",
    headerName: "Erreur",
    // type: "number",
    width: 100,
  },
];

export default function DataTable({ rows }) {
   const theme = createTheme({
     palette: {
       primary: {
         main: "#fabb00",
       },
       secondary: {
         main: "#242a2b",
       },
     },
   });
  return (
    <div
      style={{
        height: 615,
        width: "60%",
        marginTop: "1rem",
        background: "#fff",
      }}
    >

      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25]}
          checkboxSelection
        />
      </ThemeProvider>
    </div>
  );
}
