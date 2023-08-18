import { Button, FormHelperText, TextField } from "@material-ui/core";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "./services/AuthService";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContetxt";
export function Login() {

  const navigate = useNavigate();
  const userContext = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    Email: Yup.string().email().required("Email should not be empty"),
    Password: Yup.string().min(8).required("Password should not be empty"),

  })
  const handleSubmit = async (values) => {
    const payload = {
      "email": values.Email,
      "password": values.Password,
    };
    AuthService.Login(payload).then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        toast.success("Login Successful", {
          position: "bottom-right",
        });
        navigate("/Search");
        Cookies.set("auth_email", values.Email);
        userContext.setUser(response.data.result);
      }
    })
      .catch((error) => {
        toast.error("Unable to Login", {
          position: "bottom-right",
        })
      })
  }

  return (
    <>
      <div style={{ width: "360px", padding: "8% 0 0", margin: "auto" }}>
        <Formik
          initialValues={{ Email: "", Password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, errors, setFieldValue, handleBlur }) => {

            return (
              <Form>
                <div className="loginform">
                  <div className="logintext">
                    <TextField label="Email" variant="outlined" name="Email" value={values.Email} onChange={(e) => setFieldValue("Email", e.target.value)} onBlur={handleBlur} />
                    <FormHelperText error>
                      <ErrorMessage name="Email" />
                    </FormHelperText>
                    <TextField label="Password" variant="outlined" name="Password" value={values.Password} onChange={(e) => setFieldValue("Password", e.target.value)} onBlur={handleBlur} />
                    <FormHelperText error>
                      <ErrorMessage name="Password" />
                    </FormHelperText>
                  </div>
                  <div className="loginbutton">
                    <Button variant="contained" color="secondary" type="submit">Login</Button>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>

      </div>
    </>
  );
}