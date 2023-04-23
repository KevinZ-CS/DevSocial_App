import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";
  import { Formik } from "formik";
  import * as yup from "yup"; 
  
  import { useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { setLogin } from "state";
  
  
  
  
  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  }); 
  
  
  
  const initialValuesLogin = {
    email: "",
    password: "",
  }; 
  
const LoginForm = ({ setPageType, isLogin }) => {
 
    
const { palette } = useTheme();
const dispatch = useDispatch();
const navigate = useNavigate();
  
const isNonMobile = useMediaQuery("(min-width:600px)");
  
  
  
    const login = async (values, onSubmitProps) => {
      const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    };
  
    const handleFormSubmit = async (values, onSubmitProps) => {
      //these arguments are going to come from Formik, for example the va;ues arguments contain the values from the form
      if (isLogin) await login(values, onSubmitProps);
    };
  
    return (
      <Formik
        onSubmit={handleFormSubmit} //this gets passed down to handleSubmut
        initialValues={initialValuesLogin} // if we're on the login page we're going to initialized our values wwith the initialValuesLogin
        validationSchema={loginSchema} // if we're on the login page we're going to use the loginSchema for validation
      >
        {({
          values,
          errors,
          touched,
          handleBlur, 
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}> 
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))" //this is saying that we're going to split our grid into 4 sections and have a minimum of 0 otherwise we are going to split this into equal fractions of four
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, //this targets any div class thats the child of Box and is saying on smaller screens like mobile each row is going to be taking up 4 columns which is the max specified by gridTemplateColumns so each text-field will be shown on its own line on smaller screens
              }}
            >
             
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
  
            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0", //m is margin
                  p: "1rem", //p is padding
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { 
                    color: palette.primary.alt,
                    backgroundColor: palette.primary.dark
                   },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.dark,
                  },
                }}
                textAlign="center"
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    );
  };
  
  export default LoginForm;