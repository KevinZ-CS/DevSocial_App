import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage"; 
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import PageNotFound from "scenes/errorPage";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import PrivateUserRoutes from "utils/PrivateUserRoutes";

function App() {

const mode = useSelector((state) => state.auth.mode);
const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);



return (
  <div className="app">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route element={<PrivateUserRoutes />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
          </Route>

          <Route path='*' element={<PageNotFound />} />
  
         </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
  );
}

export default App;
