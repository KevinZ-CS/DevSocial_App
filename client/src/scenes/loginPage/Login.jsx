import { Box, Typography, useTheme, useMediaQuery, Card, CardContent, Container, Grid } from "@mui/material";
import LoginForm from "./LoginForm";
import backgroundImage from 'assets/social.jpg';

const Login= ({ setPageType, isLogin }) => {
const theme = useTheme();
const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

return (
  <Container backgroundcolor={theme.palette.background.alt}> 
  <Card sx={{ marginTop: 8,}} >
  <Grid container sx={{ display: 'flex', alignItems: 'center' }}>

  { isNonMobileScreens &&
    <Grid item xs={12} md={6}>
    <div style={{ backgroundImage: `url(${backgroundImage})`, height: "70vh", backgroundSize: "cover", backgroundPosition: "center" }} />
    </Grid> }

    <Grid item xs={12} md={6} s={12}  >
    <CardContent>

    <Box
        width={isNonMobileScreens ? "80%" : "100%"} 
        p="0rem"
        m="0rem auto" 
        borderRadius="1.5rem" >
     <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
       Welcome to DevSocial, the Social Media app for Web Developers!
     </Typography>

    <LoginForm setPageType={setPageType} isLogin={isLogin} />
    </Box>

    </CardContent>
    </Grid>

 </Grid>
 </Card>
 </Container>)}

 export default Login