import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import RegisterForm from "./RegisterForm";
import Login from "./Login";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  
const [pageType, setPageType] = useState("login");
const isLogin = pageType === "login";
const isRegister = pageType === "register";
const theme = useTheme();




return (

<Box>

  <ToastContainer 
  // position="top-right" 
  // autoClose={1000}
  // hideProgressBar={true}
  />
  <Box
    width="100%"
    backgroundColor={theme.palette.background.alt}
    p="1rem 6%"
    textAlign="center" >
    <Typography fontWeight="bold" fontSize="32px" color="primary">
        DevSocial
    </Typography>
   </Box>

    { isLogin && <Login setPageType={setPageType} isLogin={isLogin} />}

    {isRegister && <RegisterForm pageType={pageType} setPageType={setPageType} isLogin={isLogin} isRegister={isRegister} />}
    
</Box>
  );
};

export default LoginPage;