import React, { useEffect, useMemo, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import BookService from "./services/BookService";
import { materialCommonStyle } from "./materialCommonStyle";
import { Pagination } from "@material-ui/lab";
import { toast } from "react-toastify";
import { AuthContext } from "./context/AuthContetxt";
import { CartContext } from "./context/CartContext";


const Menu = () => {
  const [sortBy, setSortBy] = useState("a-z");

  const defaultFilter = {
    pageIndex: 1,
    pageSize: 8,
    keyword: "",
  };

  const [filters, setFilters] = useState(defaultFilter);
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    item: [],
    totalItems: 0,
  });

  const [categories, setCategories] = useState([]);

  const materialClasses = materialCommonStyle();

  const getBooks = async () => {
    try {
      const response = await BookService.GetAllBooks();
      if (response && response.status === 200) {
        const sortedBooks = [...response.data.result];
        sortedBooks.sort((a, b) => (a.name < b.name ? -1 : 1));
        setBookResponse({
          ...bookResponse,
          item: sortedBooks,
          totalItems: sortedBooks.length,
        });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  // const addToCart = (book) => {
  //   addToCart(book, AuthContext.user.id).then((res) => {
  //     if (res.error) {
  //       toast.error(res.message);
  //     } else {
  //       toast.success(res.message);
  //       CartContext.updateCart();
  //     }
  //   });
  // };

  const sortBooks = () => {
    const bookList = [...bookResponse.item];

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return sortBy === "z-a" ? -1 : 1;
      }
      if (a.name > b.name) {
        return sortBy === "a-z" ? 1 : -1;
      }
      return 0;
    });

    setBookResponse({
      ...bookResponse,
      item: bookList,
    });
  };

  useEffect(() => {
    sortBooks();
  }, [sortBy]);

  const books = useMemo(() => {
    const bookList = [...bookResponse.item];

    bookList.forEach((element) => {
      element.category = categories.find((a) => a.id === element.categoryId)?.name;
    });

    return bookList;
  }, [categories, bookResponse]);

  const totalPageCount = Math.ceil(bookResponse.totalItems / filters.pageSize);

  const booksToShow = useMemo(
    () =>
      bookResponse.item.slice(
        (filters.pageIndex - 1) * filters.pageSize,
        filters.pageIndex * filters.pageSize
      ),
    [bookResponse, filters]
  );


  return (
    <div>
      <Typography variant="h4" style={{
        textAlign: "center",
        paddingTop: "20px",
        fontFamily: '"Roboto", sans-serif',
        color: "#043a60",
        textDecoration: "underline",
      }}>Book Listing</Typography>
      <div className="container_div">
        <div className="first_label"></div>

        <div className="label_div">
          <h3 htmlFor="select">
            Sort by
          </h3>
        </div>
        <div className="select_com">
          <Select
            className={materialClasses.customSelect}
            MenuProps={{
              classes: { paper: materialClasses.customSelect },
            }}
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <MenuItem value="a-z">a-z</MenuItem>
            <MenuItem value="z-a">z-a</MenuItem>
          </Select>
        </div>

      </div>

      <div className="bookList">
        {Array.isArray(booksToShow) &&
          booksToShow.map((book, index) => (
            <div key={index} className="bookItem">
              <em>
                <img
                  src={book.base64image}
                  alt="dummyimage"
                  width="170px"
                  height="230px"
                />
              </em>
              <h4 className="bookTitle">{book.name}</h4>
              <p className="bookDescription">{book.category}</p>
              <p className="bookDescription">{book.description}</p>
              <p className="bookDescription">MRP &#8377; {book.price}</p>

              <Button
                 style={{
                  display: "inline-block",
                  padding: "10px 20px",
                   backgroundColor: "#176B87",
                
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  transition: "background-color 0.3s, transform 0.2s"
                }}
               
                // onClick={() => addToCart(book)}
                onClick={() => { }}>
                ADD TO CART
              </Button>


            </div>
          ))}
        {/* <Button variant="contained" color="primary" onClick={submitHandler}>Submit</Button> */}


      </div>
      <div style={{
        // float:"right",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}>
        <Pagination
          count={totalPageCount}
          page={filters.pageIndex}
          onChange={(e, newPage) => {
            setFilters({ ...filters, pageIndex: newPage });
          }}
        />
      </div>

    </div>
  );
};

export default Menu;

//https://github.com/Suvarnasinha/BookStore.git