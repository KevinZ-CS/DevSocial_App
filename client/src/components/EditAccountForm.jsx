import React, { useState, useEffect } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    Close,
    GifBoxOutlined,
    ImageOutlined,
  } from "@mui/icons-material";
import {
    Box,
    Typography,
    IconButton,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    useMediaQuery,
    useTheme,
    Divider,
    Button,
    Grid,
    InputLabel,
    FormControl,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import * as yup from "yup"; 
import FlexBetween from "./FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "state/authReducer";
import { updatePosts, updatePostsDisplay } from "state/postsReducer";
import { toast } from 'react-toastify';
import { updateLogin, setProfileUser } from "state/authReducer";
import getCookie from "utils/GetCookies";



const registerSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    // email: yup.string().email("invalid email").required("required"),
    // password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    bio: yup.string().required("required"),
    github_url: yup.string().required("required"),
    linkedin_url: yup.string().required("required"),
    // image: yup.string().required("required"),

}); 



const EditAccountForm = ({ open, handleClose }) => {


    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();

    // const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState("");
    const [userData, setUserData] = useState(null);

    const [buttonDisable, setButtonDisable] = useState(true)
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const dispatch = useDispatch();
    const csrftoken = getCookie('csrftoken');

    const token = useSelector((state) => state.auth.token);
    const refreshToken = useSelector((state) => state.auth.refreshToken);
    const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
    const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);
    const loggedInUser = useSelector((state) => state.auth.user);

    const getUser = async () => {
        if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
        const response = await fetch(`/api/users/${loggedInUser}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
      
        if(response.ok) {
         setUserData(data)
        console.log(data)
    } else {
        //   setError(data.error)
          console.log(data)
        } } else {
          dispatch(setLogout())
        }
      };

      useEffect(() => {
        getUser();
      }, []); 

      if(!userData) return null

      const initialValuesRegister = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        // email: "",
        // password: "",
        location: userData.location,
        occupation: userData.occupation,
        bio: userData.bio,
        github_url: userData.github_url,
        linkedin_url: userData.linkedin_url,
        image: "",
    }; 
    

         

   

      

    const handleUpdate = async (values, onSubmitProps) => {
        if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
      
        const formData = new FormData();
        // formData.append("user", loggedInUser);
        // formData.append("caption", post);

        for (let value in values) {
            if (value !== 'image') {
            formData.append(value, values[value]);
            }
            } 
            // formData.append("id", userData.id);
            // formData.append("image", values.image);
            if (values.image) {
                formData.append("image", values.image); 
              //   formData.append("picturePath", image.name);
              }


        // for (let key in userData) {
        //     if (key !== 'image') {
        //       formData.append(key, userData[key]);
        //     }
        //   }

        // if (image) {
        //   formData.append("image", image); 
        // }
      
   

    
      
        const response = await fetch(`/api/users/${loggedInUser}/`, {
          method: "PATCH",
          headers: { 
              'X-CSRFToken': csrftoken, 
              Authorization: `Bearer ${token}` },
          body: formData,
        });
        const updatedAcc = await response.json(); 
        if(response.ok) {
            onSubmitProps.resetForm(); 
            dispatch(updateLogin({
                image: updatedAcc.image,
                full_name: `${updatedAcc.first_name} ${updatedAcc.last_name}`,
               }))
      
            dispatch(setProfileUser(updatedAcc))
            getUser()
    
            // setImage(null);
            setButtonDisable(true)
            handleClose()
   
      
            toast.success('Account successfully Updated!', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
            });
        } else {
          console.log(response)
        } } else {
          dispatch(setLogout())
        }
      };






  

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="sm"
      sx={{
        marginTop: "0rem",
        "& .MuiDialogContent-root": {
          padding: 3,
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
        },
      }}
    >
           
           <DialogTitle style={{ display: 'flex', alignItems: 'center' }}>
    <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }} >
    <Close />
    </IconButton>
    </DialogTitle>


    <Formik
    onSubmit={handleUpdate} 
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


      <DialogContent >

 

       <Box    
        mt="-1rem"
        display="grid"
        gap="20px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
        sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, 
        }}
        >

        <TextField
           label="First Name"
           onBlur={handleBlur}
           error={Boolean(touched.first_name) && Boolean(errors.first_name)} 
           FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
           helperText={touched.first_name && errors.first_name} 
            // onChange={(e) => {
            //         setUserData({...userData, first_name: e.target.value} )
            //         setButtonDisable(false)
            //     }}
            // value={userData.first_name}
            onChange={(e) => {
                handleChange(e)
                setButtonDisable(false)
            }}
            value={values.first_name}
            name="first_name" 
            sx={{ gridColumn: "span 2" }} 
                />


        <TextField  
            label="Last Name"
            onBlur={handleBlur}
            error={Boolean(touched.last_name) && Boolean(errors.last_name)}
            helperText={touched.last_name && errors.last_name}
            FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
            onChange={(e) => {
                handleChange(e)
                setButtonDisable(false)
            }}
            value={values.last_name}
            // onChange={(e) => {
            // setUserData({...userData, last_name: e.target.value} )
            //         setButtonDisable(false)
            //     }}
            // value={userData.last_name}
            name="last_name"
            sx={{ gridColumn: "span 2" }}
                />


        <TextField
        label="Location"
        onBlur={handleBlur}
        error={Boolean(touched.location) && Boolean(errors.location)}
        helperText={touched.location && errors.location}
        FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
        onChange={(e) => {
            handleChange(e)
            setButtonDisable(false)
        }}
        value={values.location}
        // onChange={(e) => {
        //     setUserData({...userData, location: e.target.value} )
        //     setButtonDisable(false)
        // }}
        // value={userData.location}
        name="location"      
        sx={{ gridColumn: "span 4" }}
        />


        <TextField
        label="Occupation"
        onBlur={handleBlur}
        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
        helperText={touched.occupation && errors.occupation}
        FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
        onChange={(e) => {
            handleChange(e)
            setButtonDisable(false)
        }}
        value={values.occupation}
        // onChange={(e) => {
        //     setUserData({...userData, occupation: e.target.value} )
        //     setButtonDisable(false)
        // }}
        // value={userData.occupation}
        name="occupation"        
        sx={{ gridColumn: "span 4" }}
        />

        
        <TextField
        label="Bio"
        onBlur={handleBlur}
        error={Boolean(touched.bio) && Boolean(errors.bio)}
        helperText={touched.bio && errors.bio}
        FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
        onChange={(e) => {
            handleChange(e)
            setButtonDisable(false)
        }}
        value={values.bio}
        // onChange={(e) => {
        //     setUserData({...userData, bio: e.target.value} )
        //     setButtonDisable(false)
        // }}
        // value={userData.bio}
        name="bio"
        sx={{ gridColumn: "span 4" }}
        multiline
        rows={2}
        />


        <TextField
        label="Github Url"
        onBlur={handleBlur}
        error={Boolean(touched.github_url) && Boolean(errors.github_url)}
        helperText={touched.github_url && errors.github_url}
        FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
        onChange={(e) => {
            handleChange(e)
            setButtonDisable(false)
        }}
        value={values.github_url}
        // onChange={(e) => {
        //     setUserData({...userData, github_url: e.target.value} )
        //     setButtonDisable(false)
        // }}
        // value={userData.github_url}
        name="github_url"
        sx={{ gridColumn: "span 4" }}
        />


        <TextField
        label="Linked Url"
        onBlur={handleBlur}
        error={Boolean(touched.linkedin_url) && Boolean(errors.linkedin_url)}
        helperText={touched.linkedin_url && errors.linkedin_url}
        FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
        onChange={(e) => {
            handleChange(e)
            setButtonDisable(false)
        }}
        value={values.linkedin_url}
        // onChange={(e) => {
        //         setUserData({...userData, linkedin_url: e.target.value} )
        //         setButtonDisable(false)
        // }}
        // value={userData.linkedin_url}
        name="linkedin_url"
        sx={{ gridColumn: "span 4" }}
        />



        <Box
        gridColumn="span 4"
        border={`1px solid ${palette.neutral.medium}`}
        borderRadius="5px"
        p="1rem"
        >


        <Dropzone
          acceptedFiles={["image/*"]}
          multiple={false}
          onDrop={(acceptedFiles) => {
            setFieldValue("image", acceptedFiles[0])
            // setImage(acceptedFiles[0])
            const fileUrl = URL.createObjectURL(acceptedFiles[0]);
            setImageUrl(fileUrl);
            setButtonDisable(false)
        }}
        >
          {({ getRootProps, getInputProps }) => (
            <FlexBetween>
              <Box
                {...getRootProps()}
                border={`2px dashed ${palette.primary.main}`}
                p="1rem"
                width="100%"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!values.image ? (
                  <p>Add New Image Here</p> //Below is where you change image name to image 
                ) : (
                    <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={imageUrl} alt="uploaded" height="200px" style={{ maxWidth: "100%" }}/>
                     </Box>
                 
                )}
              </Box>
              {values.image && ( 
                <IconButton
                  onClick={() =>  setFieldValue("image", null)}
                  sx={{ width: "15%" }}
                >
                  <DeleteOutlined />
                </IconButton>
              )}
            </FlexBetween>
          )}
        </Dropzone>
      </Box>

      </Box>


      
        {/* <Divider /> */}
        <Grid container justifyContent="flex-end">
        <Button
             disabled={buttonDisable}
             onClick={handleSubmit}
             sx={{
                paddingTop: "0.5rem",
                marginTop: "0.5rem",
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "2rem",
                "&:hover": { backgroundColor: palette.primary.dark },
              }}
        >Update Post</Button>
        </Grid>




      </DialogContent>
      )}
      </Formik>
    </Dialog>
  );
};

export default EditAccountForm;