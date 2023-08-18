

import React, { useEffect, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { toast } from "react-toastify";
import BookService from "../services/BookService";
import CategoryService from "../services/CategoryService";

import { Navigate, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog";

const Bookedit = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const navigate = useNavigate();
  const defaultFilter = {
    pageIndex: 1,
    pageSize: 10,
    keyword: "",
  };
  const [bookRecords, setBookRecords] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const RecordsPerPage = [2, 5, 10, 100];
   const [filters, setFilters] = useState(defaultFilter);

  useEffect(() => {
    searchAllBooks(filters);
  }, [filters]);

  const searchAllBooks = (filters) => {
    BookService.GetAllBooks(filters)
      .then(response => {
        console.log("API Response:", response.data);
  
        if (response && response.data && Array.isArray(response.data.result)) {
          const bookData = response.data.result;
          const updatedBookRecords = {
            pageIndex: 0, // You might need to adjust this based on your API response
            pageSize: filters.pageSize,
            totalPages: 1, // You might need to calculate this based on your API response
            items: bookData,
            totalItems: bookData.length, // You might need to adjust this based on your API response
          };
          setBookRecords(updatedBookRecords);
        }
      })
      .catch(error => {
        console.error("Error fetching books:", error);
      });
  }; // The empty dependency array ensures this effect runs only once on component mount

  const onConfirmDelete = () => {
    BookService.deleteBook(selectedId)
      .then((response) => {
        toast.success("Book deleted successfully");
        setOpen(false);
        searchAllBooks(); // Refresh the book list after deletion
      })
      .catch((e) => toast.error("Failed to delete book"));
  };

  return (
    <div className="container">
      <Typography variant="h3">Book Page</Typography>

     <div style={{
        textAlign: "right",
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "10px",
        "& .btn": {
          height: "40px",
          lineHeight: "40px",
          minWidth: "100px",
          marginLeft: "10px",
          padding: "0 10px",
          fontSize: "14px",
        },
        "& .MuiFormControl-fullWidth": {
          maxWidth: "300px",
        },
     }}>
          <TextField
          id="text"
          name="text"
          placeholder="Search..."
          variant="outlined"
          style={{
            float:"right",
          }}
          inputProps={{ className: "small" }}
          onChange={(e) => {
            setFilters({ ...filters, keyword: e.target.value, pageIndex: 1 });
          }}
        />

        <Button
          type="button"
          style={{
            height: "30px",
            lineHeight: "30px",
            minWidth: "80px",
            fontSize: "14px",
            backgroundColor: "transparent",
            float:"right",
            border: "1px solid #f14d54",
            marginTop: "10px",
            marginLeft: "10px",
            borderRadius: "4px",
            padding: "7px 10px",
          }}
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => navigate("/Add")}
        >
          Add
        </Button>
      
        </div>
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Book Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookRecords.items && bookRecords.items.length > 0 ? (
            bookRecords.items.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.price}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>
                    <Button
                      type="button"
                      style={{
                        height: "30px",
                        lineHeight: "30px",
                        minWidth: "80px",
                        fontSize: "14px",
                        backgroundColor: "transparent",
                        textTransform: "capitalize",
                        border: "1px solid #80BF32",
                        
                      }}
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        console.log("Editing book with ID:", book.id);
                      navigate(`/Add/${book.id}`); // This line will be executed right after the first navigate
                      }}
                    >
                      Edit
                    </Button>
                     <Button
                    variant="contained"
                    style={{
                      height: "30px",
                      lineHeight: "30px",
                      minWidth: "80px",
                      fontSize: "14px",
                      backgroundColor: "transparent",
                      border: "1px solid #f14d54",
                      marginLeft: "10px",
                      borderRadius: "4px",
                      padding: "0 10px",
                      
                    }}
                    onClick={() => {
                      setOpen(true);
                      setSelectedId(book.id);
                    }}
                  >
                    Delete
                  </Button>
                  </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography align="center">No Books</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
        rowsPerPageOptions={RecordsPerPage}
        component="div"
        count={bookRecords.totalItems}
        rowsPerPage={filters.pageSize || 0}
        page={filters.pageIndex - 1}
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
          title="Delete book"
          description="Are you sure you want to delete this book?"
        /> 

    </div>


  );
};

export default Bookedit;

