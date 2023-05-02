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
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setProfileUser } from 'state/authReducer';
import { setSearchKeyword } from 'state/postsReducer';
import { setLogout } from "state/authReducer";

const UserWidget = ({ userId, setError }) => {

const { palette } = useTheme();
const navigate = useNavigate();
const dispatch = useDispatch();

const dark = palette.neutral.dark;
const medium = palette.neutral.medium;
const main = palette.neutral.main;
const primaryDark = palette.primary.dark;


const friends = useSelector((state) => state.auth.friendsList);
const profileFriends = useSelector((state) => state.auth.profileFriendsList);
const loggedInUser = useSelector((state) => state.auth.user);
const user = useSelector((state) => state.auth.profileUser);

const token = useSelector((state) => state.auth.token);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);




const getUser = async () => {
  if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
  const response = await fetch(`/api/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  if(response.ok) {
  dispatch(setProfileUser(data)); } else {
    setError(data.error)
    console.log(data)
  } } else {
    dispatch(setLogout())
  }
};

useEffect(() => {
  getUser();
}, [userId]); 

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
} = user;

return (
  <WidgetWrapper>
    {/* FIRST ROW */}
    <FlexBetween
      gap="0.5rem"
      pb="1.1rem" //padding-bottom
      onClick={() => {
        navigate(`/profile/${user.id}`)
        dispatch(setSearchKeyword(''))
      }}
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
          <Typography color={medium}>
            {parseInt(userId) === loggedInUser ? `${friends.length} ${friends.length > 1 ? 'friends' : 'friend'}  ` : `${profileFriends.length} ${profileFriends.length > 1 ? 'friends' : 'friend'}`} 
            </Typography>
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
      <Typography style={{ wordWrap: 'break-word' }}>
          {user.bio}
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
  