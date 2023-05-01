import { Box, Typography, useTheme } from "@mui/material";


const PageNotFound = () => {

const theme = useTheme();

return (

<Box
width="100%"
backgroundColor={theme.palette.background.alt}
p="1rem 6%"
textAlign="center" >

<Typography fontWeight="bold" fontSize="32px" color="primary">
404: Page Not Found
</Typography>

</Box>

)}

export default PageNotFound