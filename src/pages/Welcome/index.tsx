import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { colors, screenSize } from "../../constants";
import Sketch from "../../assets/pngs/sketch.webp";
import Button from "../../components/CustomButton";
import { HomeOutlined, MeetingRoomOutlined } from "@mui/icons-material";

type Props = {};

const Welcome = (props: Props) => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isPcAndAbove = useMediaQuery(`(min-width:${screenSize.pc})`);

  return (
    <Stack
      height={"100vh"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      my={"auto"}
    >
      {isPcAndAbove && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          width={"50%"}
        >
          <img src={Sketch} width={"700px"} alt="sketch" />
        </Box>
      )}
      <Stack
        py={isTablet ? 0 : 7.5}
        maxWidth={"768px"}
        width={isPcAndAbove ? "50%" : "100%"}
        justifyContent={"center"}
        alignItems={"center"}
        px={isPcAndAbove ? 10 : 5}
      >
        <Typography
          fontWeight={500}
          fontSize={isPcAndAbove ? 70 : 48}
          variant="h1"
          letterSpacing={1}
          my={2}
        >
          Picasso Play
        </Typography>
        <Divider orientation="horizontal" sx={{ color: "#f6f6f6" }} flexItem />
        <Typography
          variant={isPcAndAbove ? "h5" : "h6"}
          py={3}
          textAlign={"center"}
        >
          Unleash your creativity with fun <br /> drawings!
        </Typography>
        <Divider orientation="horizontal" sx={{ color: "#f6f6f6" }} flexItem />
        <Stack py={5} gap={2} width={"100%"}>
          <Button
            buttonText="CREATE ROOM"
            variant="outlined"
            startIcon={<HomeOutlined />}
            styles={{
              bgcolor: colors.yellowGreen,
              "&:hover": {
                bgcolor: colors.yellowGreenHover,
              },
            }}
          />
          <Button
            buttonText="JOIN ROOM"
            variant="outlined"
            startIcon={<MeetingRoomOutlined />}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Welcome;
