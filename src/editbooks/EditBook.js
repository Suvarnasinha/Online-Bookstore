import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField ,Typography} from "@material-ui/core";
import { toast } from "react-toastify";
import BookService from "../services/BookService";

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
      name: "",
      price: "",
      categoryId: 0,
      description: "",
      base64image: "",
    });
  
    useEffect(() => {
      // Fetch book data using API call and set initial values
      BookService.getById(Number(id))
        .then((res) => {
          setInitialValues({
            id: res.id,
            name: res.name,
            price: res.price,
            categoryId: res.categoryId,
            description: res.description,
            base64image: res.base64image,
          });
        })
        .catch((error) => {
          console.error("Error fetching book:", error);
        });
    }, [id]);
  
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Book Name is required"),
      description: Yup.string().required("Description is required"),
      categoryId: Yup.number().min(1, "Category is required").required("Category is required"),
      price: Yup.number().required("Price is required"),
      base64image: Yup.string().required("Image is required"),
    });
  
    const onSubmit = (values) => {
      BookService.Save(values)
        .then((res) => {
          toast.success("Book updated successfully");
          navigate("/Edit"); // Change this route based on your needs
        })
        .catch((e) => toast.error("Failed to update book"));
    };
  
    return (
      <div>
        <Typography variant="h1">Edit Book</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldError,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* Form fields and UI components for editing the book */}
              <TextField
                id="name"
                name="name"
                label="Book Name"
                variant="outlined"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              {/* ... Other form fields */}
              
              {/* Submit button */}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disableElevation
              >
                Update Book
              </Button>
            </form>
          )}
        </Formik>
      </div>
    );
  };
  
  export default EditBook;
  