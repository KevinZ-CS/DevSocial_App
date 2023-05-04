import React, { useState } from "react";
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
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "state/authReducer";
import { updatePosts, updatePostsDisplay } from "state/postsReducer";
import { toast } from 'react-toastify';
import getCookie from "utils/GetCookies";

const EditPostForm = ({ open, handleClose, postId, description, picturePath, githubUrl, demoUrl }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();

    const [image, setImage] = useState('')
    const [post, setPost] = useState(description);
    const [github, setGithub] = useState(githubUrl);
    const [demo, setDemo] = useState(demoUrl);
    const [imageUrl, setImageUrl] = useState("");

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

    const handleUpdate = async () => {
        if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
      
        const formData = new FormData();
        formData.append("user", loggedInUser);
        formData.append("caption", post);
        if (image) {
          formData.append("image", image); 
        //   formData.append("picturePath", image.name);
        }
      
   
        formData.append("github_url", github); 
        formData.append("demo_url", demo); 
    
      
        const response = await fetch(`/api/posts/${postId}/`, {
          method: "PATCH",
          headers: { 
              'X-CSRFToken': csrftoken, 
              Authorization: `Bearer ${token}` },
          body: formData,
        });
        const updatedPost = await response.json(); 
        if(response.ok) {
      
            // dispatch(addPost(newPost))
            console.log(updatedPost)
            dispatch(updatePosts(updatedPost))
            dispatch(updatePostsDisplay(updatedPost))
            setImage(null);
            setButtonDisable(true)
            handleClose()
            // setPost("");
            // setDemo("");
            // setGithub("");
            // setIsImage(false);
      
            toast.success('Successfully Updated!', {
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
        marginTop: "-5rem",
        "& .MuiDialogContent-root": {
          padding: 3,
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
        },
      }}
    >
                     <DialogTitle style={{ display: 'flex', alignItems: 'center' }} mb="-3rem">
    <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }} >
    <Close />
    </IconButton>
    </DialogTitle>

           
          {/* <IconButton onClick={handleClose}  sx={{ position: "absolute", top: 10, right: 10 }}>
            <Close />
          </IconButton>
    */}



      <DialogContent >

      <TextField
            name="post"
            placeholder="What's on your mind..."
            onChange={(e) => {
                setPost(e.target.value)
                setButtonDisable(false)
            }}
            value={post}
            sx={{
            width: "100%",
            // backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1.5rem 0rem 1rem 0rem",
            }}
            multiline
            rows={3}
        />


      <Box
        border={`1px solid ${medium}`}
        borderRadius="5px"
        mt="0rem"
        p="1rem"
      >





        <Dropzone
          acceptedFiles={["image/*"]}
          multiple={false}
          onDrop={(acceptedFiles) => {
            setImage(acceptedFiles[0])
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
                {!image ? (
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
              {image && ( 
                <IconButton
                  onClick={() => setImage(null)}
                  sx={{ width: "15%" }}
                >
                  <DeleteOutlined />
                </IconButton>
              )}
            </FlexBetween>
          )}
        </Dropzone>
      </Box>

      <Box
        m="1rem 0rem"
        display="grid"
        gap="20px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, 
        }}
      >
          <TextField
              label="Github Url"
              name="github"
              onChange={(e) => {
                setGithub(e.target.value)
                setButtonDisable(false)
            }}
              value={github}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Demo Url"
              name="demo"
              onChange={(e) => {
                setDemo(e.target.value)
                setButtonDisable(false)
            }}
              value={demo}
              sx={{ gridColumn: "span 2" }}
            />
      </Box>
      
        <Divider />
        <Grid container justifyContent="flex-end">
        <Button
             disabled={buttonDisable}
             onClick={handleUpdate}
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
    </Dialog>
  );
};

export default EditPostForm;