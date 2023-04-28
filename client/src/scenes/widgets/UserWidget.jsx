import {
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material"; 
  import { Box, Typography, Divider, useTheme } from "@mui/material";

  import { LinkedIn, GitHub } from '@mui/icons-material';

  import UserImage from "components/UserImage";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";

  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";

  //this is going to be the user profile section on the left side
  
  const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null); // this is different from the one in redux store because the one in the store is used for authentication purposes only while this one seems to be for user data, take a look how the user state is used in loginPage Form to understand
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const primaryDark = palette.primary.dark;
   
    const getUser = async () => {
      const response = await fetch(`api/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data)
      setUser(data);
    };
  
    useEffect(() => {
      getUser();
    }, []); 
  
    if (!user) {
      return null;
    } 

    const {
      image,
      first_name,
      last_name,
      location,
      occupation,
      github_url,
      linkedin_url,
      friends, //might just fetch the friends separately or include it
    } = user;
  
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem" //padding-bottom
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={image} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.dark,
                    cursor: "pointer",
                  },
                }}
              >
                {first_name} {last_name}
              </Typography>
              <Typography color={medium}>5 friends</Typography>
              {/* <Typography color={medium}>{friends.length} friends</Typography> */}
            </Box>
          </FlexBetween>
          <EditOutlined 
             sx={{
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */} 
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem"> 
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>
  
        <Divider />
  
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <Typography>
            <span>
             {user.bio}
            </span>
          </Typography>
   
        </Box>
  
        <Divider />
  
        {/* FOURTH ROW */}
        <Box p="1rem 0"> 
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
  
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">

              <GitHub sx={{ fontSize: "30px" }} />
              <Box>
                <Typography color={main} fontWeight="500"  sx={{ '& a': { textDecoration: 'none', color: main, '&:hover': { color: primaryDark } } }}>
                  <a href={github_url} target="_blank">Github</a>
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
       
          </FlexBetween>
  
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">

              <LinkedIn sx={{ fontSize: "30px" }} />
              <Box>
                <Typography color={main} fontWeight="500" sx={{ '& a': { textDecoration: 'none', color: main, '&:hover': { color: primaryDark } } }}>
                <a href={linkedin_url} target="_blank">LinkedIn</a>
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
    
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default UserWidget;
  