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
  } from "@mui/material";
  import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
  import { Formik } from "formik";
  import * as yup from "yup"; 
  import Dropzone from "react-dropzone"; 
  import FlexBetween from "components/FlexBetween";
  
  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    bio: yup.string().required("required"),
    github: yup.string().required("required"),
    linkedin: yup.string().required("required"),
    picture: yup.string().required("required"),
  }); 
  
  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    bio: "",
    github: "",
    linkedin: "",
    picture: "",
  }; 
    
const RegisterForm = ({ setPageType, isLogin, isRegister }) => {
const { palette } = useTheme();
const isNonMobile = useMediaQuery("(min-width:600px)");
const register = async (values, onSubmitProps) => {
    
      // this allows us to send form info with image
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      } //because we're uploadng an image we need to use formData so we're appendng all the values to formData and then finally appending the image aka picturePath
      formData.append("picturePath", values.picture.name);
  
      const savedUserResponse = await fetch(
        "http://localhost:3001/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm(); //onSubmitProps is provided by formik and allows us to perform a number of functions such as resetting the form
  
      if (savedUser) {
        setPageType("login");
      } //if we successfully succeeded getting the user
    };
  
  
  
    const handleFormSubmit = async (values, onSubmitProps) => {
      //these arguments are going to come from Formik, for example the va;ues arguments contain the values from the form
      if (isRegister) await register(values, onSubmitProps);
    };
  
    return (
      <Formik
        onSubmit={handleFormSubmit} //this gets passed down to handleSubmut
        initialValues={initialValuesRegister} // if we're on the login page we're going to initialized our values wwith the initialValuesLogin
        validationSchema={registerSchema} // if we're on the login page we're going to use the loginSchema for validation
      >
        {({
          values,
          errors,
          touched,
          handleBlur, //these values allow you to use them in your components and form
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
              gridTemplateColumns="repeat(4, minmax(0, 1fr))" //this is saying that we're going to split our grid into 4 sections and have a minimum of 0 otherwise we are going to split this into equal fractions of four
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, //this targets any div class thats the child of Box and is saying on smaller screens like mobile each row is going to be taking up 4 columns which is the max specified by gridTemplateColumns so each text-field will be shown on its own line on smaller screens
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName" //this has to align with the initial value object key above
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    } //we want to check if it has been touched or if there is an error and it will show if we have an error for this text-field
                    helperText={touched.firstName && errors.firstName} //this will show the helper text if we need to, remember && will only evaluate the second option if the first option is true
                    sx={{ gridColumn: "span 2" }} //in large screens it will show a span of 2 but in smaller screens the span of 4 will overrid this span
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
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
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />
  
  
                  <TextField
                    label="Bio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bio}
                    name="bio"
                    error={
                      Boolean(touched.bio) && Boolean(errors.bio)
                    }
                    helperText={touched.bio && errors.bio}
                    sx={{ gridColumn: "span 4" }}
                    multiline
                    rows={2}
                    // maxRows={4}
                  />
  
                  <TextField
                    label="Github Url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.github}
                    name="github"
                    error={
                      Boolean(touched.github) && Boolean(errors.github)
                    }
                    helperText={touched.github && errors.github}
                    sx={{ gridColumn: "span 4" }}
                  />
  
                  <TextField
                    label="LinkedIn Url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.linkedin}
                    name="linkedin"
                    error={
                      Boolean(touched.linkedin) && Boolean(errors.linkedin)
                    }
                    helperText={touched.linkedin && errors.linkedin}
                    sx={{ gridColumn: "span 4" }}
                  />
  
  
  
  
  
  
  
  
  
  
  
  
  
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()} //ths is just something you need to do with dropdonze and pass in this prop
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem" //p is for padding
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
  
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
                    color: palette.primary.main,
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
          </CardContent>
  
          </Card>
          </Container>
        )}
      </Formik>
    );
  };
  
  export default RegisterForm;