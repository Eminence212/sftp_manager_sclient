import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import "./style.css";

const SelectBtn = ({ records, action, item }) => {
  return (
    <Box sx={{ marginTop: "1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="typeId"
          value={item}
          label="Type"
          onChange={action}
        >
          <MenuItem disabled value="">
            <em>Type de client</em>
          </MenuItem>
          {records.map((val) => {
            return (
              <MenuItem key={val.id} value={val.id}>
                {val.description}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectBtn;
