

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination } from "@material-ui/core";
import { toast } from "react-toastify";
import ConfirmationDialog from "./ConfirmationDialog";
import UserService from "./services/UserService";
import { useAuthContext } from "./layout/WithAuth";

const User = () => {
  const authContext = useAuthContext();
  const RecordsPerPage = [2, 5, 10, 100];
  const defaultFilter = {
    pageIndex: 1,
    pageSize: 10,
    keyword: "",
  };
  const [filters, setFilters] = useState(defaultFilter);
  const [userList, setUserList] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers(filters);
  }, [filters]);

  // const getAllUsers = async (filters) => {
  //   try {
  //     const res = await UserService.getAllUsers(filters);
  //     if (res.data && res.data.items) { // Check if items array exists in response
  //       setUserList(res.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  const getAllUsers = (filters) => {
    UserService.getAllUsers(filters)
      .then(response => {
        console.log("API Response:", response.data);

        if (response && response.data && Array.isArray(response.data.result)) {
          const userData = response.data.result;
          const updatedUserRecords = {
            pageIndex: 0, // You might need to adjust this based on your API response
            pageSize: filters.pageSize,
            totalPages: 1, // You might need to calculate this based on your API response
            items: userData,
            totalItems: userData.length, // You might need to adjust this based on your API response
          };
          setUserList(updatedUserRecords);
        }
      })
      .catch(error => {
        console.error("Error fetching user:", error);
      });
  };

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    setOpen(true);
    setSelectedId(userId);
  };

  const onConfirmDelete = () => {
    UserService.deleteUser(selectedId)
      .then((response) => {
        toast.success("USER deleted successfully");
        setOpen(false);
        getAllUsers(); // Refresh the book list after deletion
      })
      .catch((e) => toast.error("Failed to delete USER"));
  };

  return (
    <div className="container">
      <Typography variant="h1">User</Typography>
      <div className="btn-wrapper">
        <TextField
          id="text"
          name="text"
          placeholder="Search..."
          variant="outlined"
          inputProps={{ className: "small" }}
          onChange={(e) => {
            setFilters({ ...filters, keyword: e.target.value, pageIndex: 1 });
          }}
        />
      </div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>



          <TableBody>
            {userList.items && userList.items.length > 0 ? (
              userList.items.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.firstName}</TableCell>
                  <TableCell>{book.lastName}</TableCell>
                  <TableCell>{book.email}</TableCell>
                  <TableCell>{book.role}</TableCell>
                  <TableCell>
                  {/* <Button
                      type="button"
                      style={{
                        height: "30px",
                        lineHeight: "30px",
                        minWidth: "80px",
                        fontSize: "14px",
                        backgroundColor: "transparent",
                        textTransform: "capitalize",
                        border: "1px solid #80BF32"

                      }}
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        console.log("Editing User with ID:", book.id);
                      // navigate(`/edituser/${book.id}`); // This line will be executed right after the first navigate
                        navigate("/edituser");
                    }}
                    >
                      Edit
                    </Button> */}
                    <Button
                      type="button"
                      style={{
                        height: "30px",
                        lineHeight: "30px",
                        minWidth: "80px",
                        fontSize: "14px",
                        backgroundColor: "transparent",
                        textTransform: "capitalize",
                        border: "1px solid #f14d54"

                      }}
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => handleDeleteUser(book.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography align="center">No User</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={RecordsPerPage}
        component="div"
        count={userList?.totalItems || 0}
        rowsPerPage={filters?.pageSize || 0}
        page={filters?.pageIndex - 1 || 0}
        onPageChange={(e, newPage) => {
          setFilters({ ...filters, pageIndex: newPage + 1 });
        }}
        onRowsPerPageChange={(e) => {
          setFilters({
            ...filters,
            pageIndex: 1,
            pageSize: Number(e.target.value),
          });
        }}
      />

      <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onConfirmDelete()}
        title="Delete user"
        description={"Shared.messages.USER_DELETE"}
      />
    </div>
  );
};

export default User;
