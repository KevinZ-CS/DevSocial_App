import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Ad from "assets/ad.jpg";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={Ad}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>BioAqua</Typography>
        <Typography color={medium}>bioaqua.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, eveniet? Aliquam, reprehenderit beatae! Tempora neque nam pariatur minus, ea esse cupiditate porro, voluptatibus possimus numquam a ex quisquam ipsum voluptate.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;