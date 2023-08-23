import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Switch,
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
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import "./style.css";

//Castomisation des styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#242a2b",
    color: "#fff",
    fontWeight: 400,
    fontSize: 14,
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

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
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
const DataTable = ({
  data,
  handleDelete,
  showData,
  handleDisable,
  handleEnable,
  handleValidation,
  isAdmin,
}) => {
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
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Host</StyledTableCell>
            <StyledTableCell align="left">Port</StyledTableCell>
            <StyledTableCell align="left">Inbound source path</StyledTableCell>
            <StyledTableCell align="left">
              Inbound destination path
            </StyledTableCell>
            <StyledTableCell align="left">Outbound source path</StyledTableCell>
            <StyledTableCell align="left">
              Outbound destination path
            </StyledTableCell>
            <StyledTableCell align="left">Source error path</StyledTableCell>
            <StyledTableCell align="left">
              Destination error path
            </StyledTableCell>
            <StyledTableCell align="left">Source archive path</StyledTableCell>
            <StyledTableCell align="left">
              Destination archive path
            </StyledTableCell>
            <StyledTableCell align="left">Prefix</StyledTableCell>
            {isAdmin ? (
              <>
                <StyledTableCell align="left">Validation</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </>
            ) : (
              <>
                <StyledTableCell align="left">Validation</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {record.map((item, index) => {
            const {
              id,
              name,
              host,
              port,
              username,
              inbound,
              inbound_amp,
              outbound,
              outbound_amp,
              erreur,
              erreur_amp,
              archive,
              archive_amp,
              autovalidation,
              enable,
              response_slug,
            } = item;
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
                <TableCell align="left">{name.toUpperCase()}</TableCell>
                <TableCell align="left">{host}</TableCell>
                <TableCell align="left">{port}</TableCell>
                <TableCell align="left">{inbound}</TableCell>
                <TableCell align="left">{inbound_amp}</TableCell>
                <TableCell align="left">{outbound}</TableCell>
                <TableCell align="left">{outbound_amp}</TableCell>
                <TableCell align="left">{erreur}</TableCell>
                <TableCell align="left">{erreur_amp}</TableCell>
                <TableCell align="left">{archive}</TableCell>
                <TableCell align="left">{archive_amp}</TableCell>
                <TableCell align="center">
                  {response_slug ? response_slug : "-"}
                </TableCell>
                {isAdmin ? (
                  <>
                    <TableCell align="center">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              sx={{ m: 1 }}
                              checked={autovalidation}
                              onClick={() =>
                                handleValidation({ id, autovalidation, name })
                              }
                            />
                          }
                          label={autovalidation ? "Auto" : "Manuel"}
                        />
                      </FormGroup>
                    </TableCell>
                    <TableCell align="left">
                      <span
                        className={enable ? "mode mode_on" : "mode mode_off"}
                      >
                        {enable ? "Actif" : "Inactif"}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <ButtonGroup size="small" id="btn_group">
                        {enable && (
                          <>
                            <Button
                              onClick={() =>
                                handleDelete({ id, name, username })
                              }
                            >
                              <Tooltip title="Supprimer">
                                <DeleteIcon fontSize="small" />
                              </Tooltip>
                            </Button>
                            <Button onClick={() => showData(item)}>
                              <Tooltip title="Modiffier">
                                <EditIcon fontSize="small" />
                              </Tooltip>
                            </Button>
                          </>
                        )}

                        {enable ? (
                          <Button onClick={() => handleDisable({ id, name })}>
                            <Tooltip title="Désactiver">
                              <PersonOffIcon fontSize="small" />
                            </Tooltip>
                          </Button>
                        ) : (
                          <Button onClick={() => handleEnable({ id, name })}>
                            <Tooltip title="Activer">
                              <PersonIcon fontSize="small" />
                            </Tooltip>
                          </Button>
                        )}
                      </ButtonGroup>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="center">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              sx={{ m: 1 }}
                              checked={autovalidation}
                            />
                          }
                          label={autovalidation ? "Auto" : "Manuel"}
                        />
                      </FormGroup>
                    </TableCell>
                    <TableCell align="left">
                      <span
                        className={enable ? "mode mode_on" : "mode mode_off"}
                      >
                        {enable ? "Actif" : "Inactif"}
                      </span>
                    </TableCell>
                  </>
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
