import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    FormHelperText,
  } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";   
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import getCookie from "utils/GetCookies"
import { useState } from "react";
  
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
const [error, setError] =  useState("");
  
const isNonMobile = useMediaQuery("(min-width:600px)");

const csrftoken = getCookie('csrftoken');

const login = async (values, onSubmitProps) => {

    console.log(values)
const response = await fetch(
    "api/login/",
    {   headers: {
        'X-CSRFToken': csrftoken, 
        "Content-Type": "application/json",
    },
        method: "POST",
        body: JSON.stringify(values),
    })

    const data = await response.json()

    if (response.ok) {
        console.log(data)
        onSubmitProps.resetForm(); 
        dispatch(setLogin({
         user: data.user_id,
         token: data.access_token,
        }))
       navigate("/home");
    } else {
        console.log(data)
        setError(data.error)
    }
};





  
// const login = async (values, onSubmitProps) => {
//     const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(values),
//     });
//     const loggedIn = await loggedInResponse.json();
//     onSubmitProps.resetForm();
//     if (loggedIn) {
//     dispatch(
//         setLogin({
//         user: loggedIn.user,
//         token: loggedIn.token,
//         })
//     );
//     navigate("/home");
//     }
// };
  
// const handleFormSubmit = async (values, onSubmitProps) => {
//     if (isLogin) await login(values, onSubmitProps);
// };

return (
<Formik
    onSubmit={login} 
    initialValues={initialValuesLogin} 
    validationSchema={loginSchema} >
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
        gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
        sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, 
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
            FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
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
            FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
            sx={{ gridColumn: "span 4" }}
        />

          {error && <FormHelperText sx={{ gridColumn: "span 4 ", color: "red", fontSize: "0.75rem", mt: "-1rem" }}>{error}</FormHelperText>}
        </Box>

        {/* BUTTONS */}
        <Box>
        <Button
            fullWidth
            type="submit"
            sx={{
            m: "2rem 0", 
            p: "1rem", 
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { 
                color: palette.primary.alt,
                backgroundColor: palette.primary.dark
            },
            }}
        >
            LOGIN
        {/* {isLogin ? "LOGIN" : "REGISTER"} */}
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
            Don't have an account? Sign Up here.
            {/* {isLogin
            ? "Don't have an account? Sign Up here."
            : "Already have an account? Login here."} */}
        </Typography>
        </Box>
    </form>
    )}
</Formik>
    );
  };
  
 export default LoginForm;