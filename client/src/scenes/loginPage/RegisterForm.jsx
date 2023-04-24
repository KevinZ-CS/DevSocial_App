import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    Container,
    Card,
    CardContent,
    FormHelperText,
  } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup"; 
import Dropzone from "react-dropzone"; 
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import getCookie from "utils/GetCookies"
  
const registerSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    bio: yup.string().required("required"),
    github_url: yup.string().required("required"),
    linkedin_url: yup.string().required("required"),
    image: yup.string().required("required"),

}); 

const initialValuesRegister = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    bio: "",
    github_url: "",
    linkedin_url: "",
    image: "",
}; 
    
const RegisterForm = ({ setPageType, isLogin, isRegister }) => {
const { palette } = useTheme();
const isNonMobile = useMediaQuery("(min-width:600px)");
const [errors, setErrors] = useState([]);
    
const csrftoken = getCookie('csrftoken');

const handleSubmit = async (values, onSubmitProps) => {

const formData = new FormData();
    for (let value in values) {
    formData.append(value, values[value]);
    } 
    formData.append("image", values.image);

register(formData)    

function register(data) { fetch(
    "api/users/",
    {   headers: {
        'X-CSRFToken': csrftoken },
        method: "POST",
        body: data,
    })
    .then((response) => {
        if(response.ok) {
           response.json().then((user) => {
            console.log(user) 
            onSubmitProps.resetForm(); 
            if (user) {
                setPageType("login");
            } 
        
        }) 

        } else {
            response.json().then((error) => {
                setErrors(error)
                console.log(error)})
        }
    })

}

};

const {
    image,
    email,
    password,
  } = errors;
  
return (
    <Formik
    onSubmit={handleSubmit} 
    initialValues={initialValuesRegister} 
    validationSchema={registerSchema} 
    >
    {({
        values,
        errors,
        touched,
        handleBlur, 
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
    }) => (
        <Container maxWidth='sm'>
            <Card sx={{ marginTop: 5 }}>
            <CardContent>
            <form onSubmit={handleSubmit}>   
            <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
            sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, 
            }}
        >
            {isRegister && (
            <>
            <TextField
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name" 
                error={Boolean(touched.first_name) && Boolean(errors.first_name)} 
                helperText={touched.first_name && errors.first_name} 
                FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
                sx={{ gridColumn: "span 2" }} 
                />
            <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={Boolean(touched.last_name) && Boolean(errors.last_name)}
                helperText={touched.last_name && errors.last_name}
                FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
                sx={{ gridColumn: "span 2" }}
                />
            <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
                sx={{ gridColumn: "span 4" }}
                />
            <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                helperText={touched.occupation && errors.occupation}
                FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
                sx={{ gridColumn: "span 4" }}
                />
            <TextField
                label="Bio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bio}
                name="bio"
                error={Boolean(touched.bio) && Boolean(errors.bio)}
                helperText={touched.bio && errors.bio}
                FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={2}
                // maxRows={4}
                />
            <TextField
                label="Github Url"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.github_url}
                name="github_url"
                error={Boolean(touched.github_url) && Boolean(errors.github_url)}
                helperText={touched.github_url && errors.github_url}
                FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
                sx={{ gridColumn: "span 4" }}
                />

            <TextField
                label="LinkedIn Url"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.linkedin_url}
                name="linkedin_url"
                error={Boolean(touched.linkedin_url) && Boolean(errors.linkedin_url)}
                helperText={touched.linkedin_url && errors.linkedin_url}
                FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
                sx={{ gridColumn: "span 4" }}
                />

            <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
                >
            <Dropzone
                acceptedFiles=".jpg,.jpeg,.png,.gif"
                multiple={false}
                onDrop={(acceptedFiles) =>
                setFieldValue("image", acceptedFiles[0])
                }
                >
            {({ getRootProps, getInputProps }) => (
                <Box
                    {...getRootProps()} 
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem" 
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                    <input {...getInputProps()} />
                    {!values.image ? (
                    <p>Add Picture Here</p>
                    ) : (
                    <FlexBetween>
                        <Typography>{values.image.name}</Typography>
                        <EditOutlinedIcon />
                    </FlexBetween>
                    )}
                </Box>
                    )}
            </Dropzone>
            </Box>
            {image && <FormHelperText sx={{ gridColumn: "span 4 ", color: "red", fontSize: "0.75rem", mt: "-1rem" }}>{image}</FormHelperText>}
            </>
            )}

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
            {email && <FormHelperText sx={{ gridColumn: "span 4 ", color: "red", fontSize: "0.75rem", mt: "-1rem" }}>{email[0].replace('user', 'User')}</FormHelperText>}
        

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

            {password && <FormHelperText sx={{ gridColumn: "span 4 ", color: "red", fontSize: "0.75rem", mt: "-1rem" }}>{password}</FormHelperText>}
   
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
                color: palette.primary.main,
                backgroundColor: palette.primary.dark 
                },
            }}
            >Register
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
            Already have an account? Login here.
            </Typography>
            </Box>
            </form>
        </CardContent>
        </Card>
        </Container>
    )}
    </Formik>
);
};
  
export default RegisterForm;