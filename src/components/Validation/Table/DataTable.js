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
import PropTypes from "prop-types";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { dateFormat } from "../../../utils/Futures";
import SendIcon from "@mui/icons-material/Send";
import InfoIcon from "@mui/icons-material/Info";
import "./style.css";
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
    padding: 0,
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
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
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
const DataTable = ({
  data,
  handleClick,
  tab_name,
  directory,
  customer,
  isAdmin,
  handleClickOpenDialog,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [record, setRecord] = useState([]);
  const { autovalidation } = customer;
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

  // Customers;
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="left">Nom du fichier</StyledTableCell>
            <StyledTableCell align="left">Modification</StyledTableCell>
            {!isAdmin && <StyledTableCell align="left">Action</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {record.map((item, index) => {
            const { name, modifyTime } = item;
            return (
              <StyledTableRow
                key={index}
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
                  <Avatar sx={{ width: 24, height: 24 }}>
                    <TextSnippetIcon fontSize="small" />
                  </Avatar>
                </TableCell>
                <TableCell align="left" sx={{ p: 0 }}>
                  {name}
                </TableCell>

                <TableCell align="left">{dateFormat(modifyTime)}</TableCell>
                {!isAdmin && (
                  <TableCell align="left">
                    {tab_name === "source" ? (
                      <Tooltip title="Détail">
                        <IconButton
                          disabled={directory !== "in"}
                          color="success"
                          size="small"
                          onClick={() =>
                            handleClickOpenDialog({ ...item, autovalidation })
                          }
                          // onClick={() => handleClick(name)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Télécharger">
                        <IconButton
                          disabled={directory === "in"}
                          color="success"
                          size="small"
                          onClick={() => handleClick(name)}
                        >
                          <CloudDownloadIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
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
