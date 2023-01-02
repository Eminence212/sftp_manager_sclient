import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import EditIcon from "@mui/icons-material/Edit";

import PropTypes from "prop-types";
import { convertDate } from "../../../utils/Dates";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

//Castomisation des styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#242a2b",
    color: "#fff",
    fontWeight: 400,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
//Pagination
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
const DataTable = ({ data, handleDelete, showData }) => {
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [record, setRecord] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    setRecord(
      rowsPerPage > 0
        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : data
    );
  }, [page, rowsPerPage, data]);

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="left">
              Nom, Post-Nom & Prénom
            </StyledTableCell>
            <StyledTableCell align="left">Type</StyledTableCell>
            <StyledTableCell align="left">Utilisateur</StyledTableCell>
            <StyledTableCell align="left">Création</StyledTableCell>
            <StyledTableCell align="left">Modification</StyledTableCell>

            <StyledTableCell align="left">Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {record.map((item, index) => {
            const { id, name, Type, User, createdAt, updatedAt } = item;
            return (
              <StyledTableRow
                key={id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    borderBottom: 0,
                  },
                }}
              >
                <TableCell
                  align="center"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </TableCell>
                <TableCell align="left">{name}</TableCell>

                <TableCell align="left">{Type.description}</TableCell>
                <TableCell align="left">{User.name}</TableCell>
                <TableCell align="left">{convertDate(createdAt)}</TableCell>
                <TableCell align="left">{convertDate(updatedAt)}</TableCell>

                <TableCell align="left">
                  {auth.isAdmin && (
                    <Tooltip title="Supprimer" placement="top" arrow>
                      <IconButton
                        size="medium"
                        sx={{
                          color: "#242a2b",
                        }}
                        onClick={() => handleDelete({ id, name })}
                      >
                        <DeleteSweepIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Modifier" placement="top" arrow>
                    <IconButton
                      size="medium"
                      sx={{
                        color: "#242a2b",
                      }}
                      onClick={() =>
                        showData({
                          id,
                          name,
                          typeId: Type.id,
                          userId: User.id,
                        })
                      }
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
