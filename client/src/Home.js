import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Video } from "@splidejs/splide-extension-video";
import "@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { Box } from "@mui/system";
import background from "./pics/U.jpeg";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import splide1 from "./pics/splide1.jpg";
import splide2 from "./pics/splide2.jpg";
import splide3 from "./pics/splide3.jpg";


function HomePage() {
  const { isCollapsed } = useContext(MyContext);
  

  return (
    <Box
      p={"20px"}
      ml={isCollapsed ? "80px" : "270px"}
      display="flex"
      flexDirection="column"
      overflow="visible"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        position: "relative",
        overflow: "scroll",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        mr={2}
        mt={7}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow="0px 0px 15px 5px rgba(255, 255, 255, 0.5)" // Increase the spread radius and reduce the alpha value for glow
          borderRadius="10px" 
          padding="10px" 
        >
          <Splide
            options={{
              type: "loop",
              width: 600,
              height: 400,
            }}
            extensions={{ Video }}
          >
            <SplideSlide data-splide-youtube="ntkHVjBNRow">
              <img
                src={splide1}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </SplideSlide>
            <SplideSlide data-splide-youtube="XRC86T7X8O8">
              <img
                src={splide2}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </SplideSlide>
            <SplideSlide data-splide-youtube="ygWHTY1KrMg">
              <img
                src={splide3}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </SplideSlide>
          </Splide>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
