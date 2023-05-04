import {
    EditOutlined,
    DeleteOutlined,
    GifBoxOutlined,
    ImageOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    TextField,
  } from "@mui/material";

import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "state/postsReducer";
import getCookie from "utils/GetCookies";
import { toast } from 'react-toastify';
import { setLogout } from "state/authReducer";

const MyPostWidget = () => {

const dispatch = useDispatch();
const [isImage, setIsImage] = useState(false); 
const [image, setImage] = useState(null); 
const [post, setPost] = useState("");
const [github, setGithub] = useState("");
const [demo, setDemo] = useState("");
const { palette } = useTheme();
const id = useSelector((state) => state.auth.user); 
const picturePath = useSelector((state) => state.auth.image); 

const isNonMobileScreens = useMediaQuery("(min-width: 1100px)");
const isNonMobile = useMediaQuery("(min-width:600px)");
const mediumMain = palette.neutral.mediumMain;
const medium = palette.neutral.medium;
const csrftoken = getCookie('csrftoken');

const token = useSelector((state) => state.auth.token);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);
const [imageUrl, setImageUrl] = useState("");


    //for all post make sure to use filter display since we will be trying to implement the search functionality as well for users name
    //the next step is believe is to create the url and view for this, remember to add the authorization in the post view as well
 
const handlePost = async () => {
  if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {

  const formData = new FormData();
  formData.append("user", id);
  formData.append("caption", post);
  if (image) {
    formData.append("image", image); 
    // formData.append("picturePath", image.name);
  }

  if (github) {
    formData.append("github_url", github); 
  }
  if (demo) {
    formData.append("demo_url", demo); 
  }

  const response = await fetch(`/api/posts/create/`, {
    method: "POST",
    headers: { 
        'X-CSRFToken': csrftoken, 
        Authorization: `Bearer ${token}` },
    body: formData,
  });
  const newPost = await response.json(); 
  if(response.ok) {

      dispatch(addPost(newPost))
      setImage(null);
      setPost("");
      setDemo("");
      setGithub("");
      setIsImage(false);

      toast.success('Successfully Posted!', {
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
  <WidgetWrapper mb="2rem"> 
    <FlexBetween gap="1.5rem">
      <UserImage image={picturePath} />
      <InputBase
        placeholder="What's on your mind..."
        onChange={(e) => setPost(e.target.value)}
        value={post}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem",
        }}
      />
    </FlexBetween>
    {isImage && (
      <>
      <Box
        border={`1px solid ${medium}`}
        borderRadius="5px"
        mt="1rem"
        p="1rem"
      >
        <Dropzone
          acceptedFiles={["image/*"]}
          multiple={false}
          onDrop={(acceptedFiles) => {
            setImage(acceptedFiles[0])
            const fileUrl = URL.createObjectURL(acceptedFiles[0]);
            setImageUrl(fileUrl);
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
                  <p>Add Image Here</p> //Below is where you change image name to image 
                ) : (
                  <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                    <img src={imageUrl} alt="uploaded" height="200px" style={{ maxWidth: "100%" }}/>
                    {/* <Typography>{image.name}</Typography> 
                    <EditOutlined /> */}
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
        mt="1rem"
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
              onChange={(e) => setGithub(e.target.value)}
              value={github}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Demo Url"
              name="demo"
              onChange={(e) => setDemo(e.target.value)}
              value={demo}
              sx={{ gridColumn: "span 2" }}
            />
      </Box>

      </>
      
    )}

    <Divider sx={{ margin: "1.25rem 0" }} />

    <FlexBetween>
      <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
        <ImageOutlined sx={{ color: mediumMain }} />
        <Typography
          color={mediumMain}
          sx={{ "&:hover": { cursor: "pointer", color: medium } }}
        >
          Image
        </Typography>

        <IconButton>
          <GifBoxOutlined sx={{ color: mediumMain }} />
          </IconButton>

      </FlexBetween>

      <Button
        disabled={!post}
        onClick={handlePost}
        sx={{
          color: palette.background.alt,
          backgroundColor: palette.primary.main,
          borderRadius: "3rem",
          "&:hover": { backgroundColor: palette.primary.dark },
        }}
      >
        POST
      </Button>
    </FlexBetween>
  </WidgetWrapper>
);
};

export default MyPostWidget;