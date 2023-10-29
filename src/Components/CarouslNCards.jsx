import { Box, Image } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

const CarouslNCards = () => {
  const [imageData, setImageData] = useState([
    {
      label: "Image 2",
      alt: "image2",
      url: "https://cdn.thomasnet.com/insights-images/eaf2ea91-c0ca-488d-ab63-af480b6f78cb/750px.png",
    },
    {
      label: "Image 3",
      alt: "image3",
      url: "https://moneyinc.com/wp-content/uploads/2018/11/Willow-750x500.jpg",
    },
    {
      label: "Image 4",
      alt: "image4",
      url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY",
    },
  ]);

  const renderSlides = imageData.map((image) => (
    <div key={image.alt} style={{ height: "25vh" }}>
      <img
        src={image.url}
        alt={image.alt}
        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }}
      />
      <p className="legend">{image.label}</p>
    </div>
  ));

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/ad")
      .then((res) => {
        console.log(res.data);
        // setImageData(res.data.images);
        setImageData(
          res.data.adList.map((item) => {
            return {
              label: item.label,
              alt: item.alt,
              url: item.url,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err, "<< error in getting ad-banner");
      });
  }, []);
  return (
    <>
      <Box
        mt={12}
        display={"flex"}
        alignItems={"flex-start"}
        flexDirection={"row"}
        gap={4}
      >
        <Box flex={5} rounded={"xl"} overflow={"hidden"}>
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            className="carousel-container"
          >
            {renderSlides}
          </Carousel>
        </Box>
        <Box
          height={"25vh"}
          bg="skyblue"
          flex={1}
          rounded={"xl"}
          overflow={"hidden"}
        >
          <div>
            <h3 style={contentStyle}>5</h3>
          </div>
        </Box>
        <Box
          height={"25vh"}
          bg="skyblue"
          flex={1}
          rounded={"xl"}
          overflow={"hidden"}
        >
          <div>
            <h3 style={contentStyle}>6</h3>
          </div>
        </Box>
        <Box
          height={"25vh"}
          bg="skyblue"
          flex={1}
          rounded={"xl"}
          overflow={"hidden"}
        >
          <div>
            <h3 style={contentStyle}>7</h3>
          </div>
        </Box>
        <Box
          height={"25vh"}
          bg="skyblue"
          flex={1}
          rounded={"xl"}
          overflow={"hidden"}
        >
          <div>
            <h3 style={contentStyle}>8</h3>
          </div>
        </Box>
      </Box>
    </>
  );
};

const contentStyle = {
  height: "100%",
  color: "#fff",
  lineHeight: "25vh",
  textAlign: "center",
  background: "#364d79",
};

export default CarouslNCards;

// <Box
//   height={"25vh"}
//   // bg="skyblue"
//   flex={4}
//   rounded={"xl"}
//   overflow={"hidden"}
//   // padding={2}
// >
//   <Carousel autoPlay>
//     <div>
//       <img
//         alt="1"
//         src="https://img.freepik.com/free-photo/miami-skyline_649448-878.jpg?size=626&ext=jpg"
//       />
//     </div>
//     <div>
//       <img
//         alt="2"
//         src="https://img.freepik.com/free-photo/miami-skyline_649448-878.jpg?size=626&ext=jpg"
//       />
//     </div>
//     <div>
//       <img
//         alt="3"
//         src="https://img.freepik.com/free-photo/miami-skyline_649448-878.jpg?size=626&ext=jpg"
//       />
//     </div>
//   </Carousel>
// </Box>;
