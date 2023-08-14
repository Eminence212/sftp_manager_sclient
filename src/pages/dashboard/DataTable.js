import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "client", headerName: "Nom Client", width: 250 },
  {
    field: "inbox",
    headerName: "Inbox",
    // type: "number",
    width: 120,
  },
  {
    field: "archive",
    headerName: "Archive",
    // type: "number",
    width: 120,
  },
  {
    field: "erreur",
    headerName: "Erreur",
    // type: "number",
    width: 120,
  },
];

export default function DataTable({ rows }) {
  return (
    <div style={{ height: 400, width: "100%", marginTop: "1rem" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
      />
    </div>
  );
}
