import { Button, FormHelperText, TextField } from "@material-ui/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import AuthService from "./services/AuthService";
import { toast } from 'react-toastify';

export function Register() {
  const [open, setOpen] = useState(false);
  const [UserName, setusername] = useState("");
  const [Age, setage] = useState("");
  const [Email, setemail] = useState("");
  const [Password, setpassword] = useState("");

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().required("username should not be empty"),
    Age: Yup.number().min(18),
    Email: Yup.string().email(),
    Password: Yup.string().min(8).required("Password should not be empty"),

  })
  const handleSubmit = async (values) => {
    //setOpen(true);
    // console.log("current value:", UserName);
    // console.log("current value:", Age);
    // console.log("current value:", Email);
    // console.log("current value:", Password);

    const payload = {
      "firstName": values.UserName,
      "lastName": "test",
      "email": values.Email,
      "roleId": 2,
      "password": values.Password,
    };
    //await AuthService.Register(payload).then((reponse) => console(reponse));
    AuthService.Register(payload).then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        toast.success("Data submitted succesfully", {
          position: "bottom-right",
        })
      }
    })
      .catch((error) => {
        toast.error("Unable to submit the data", {
          position: "bottom-right",
        })
      })
  };



  return (
    <>
      {/* <div className="page">REGISTRATION PAGE</div> */}
      <Formik
        initialValues={{ UserName: '', Age: '', Email: '', Password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, errors, setFieldValue }) => {
          console.log("error:", errors);
          return (
            <Form>
              <div style={{ width: "500px", padding: "7% 0 0", margin: "auto" }}>
                <div className="loginform">
                  <div className="logintext">
                    <TextField label="UserName" variant="outlined" name="UserName" value={values.UserName} error={errors.UserName} onChange={(e) => setFieldValue("UserName", e.target.value)} />
                    <FormHelperText error>
                      <ErrorMessage name="UserName" />
                    </FormHelperText>
                    <TextField label="Age" variant="outlined" name="Age" value={values.Age} onChange={(e) => setFieldValue("Age", e.target.value)} />
                    <FormHelperText error>
                      <ErrorMessage name="Age" />
                    </FormHelperText>
                    <TextField label="Email" variant="outlined" name="Email" value={values.Email} onChange={(e) => setFieldValue("Email", e.target.value)} />
                    <FormHelperText error>
                      <ErrorMessage name="Email" />
                    </FormHelperText>
                    <TextField label="Password" variant="outlined" name="Password" value={values.Password} onChange={(e) => setFieldValue("Password", e.target.value)} />
                    <FormHelperText error>
                      <ErrorMessage name="Password" />
                    </FormHelperText>
                  </div>
                  <div className="loginbutton">
                    <Button variant="contained" color="secondary" type="submit">Registration</Button>
                  </div>
                </div>

              </div>
            </Form>
          )
        }}
      </Formik>

    </>
  );
}