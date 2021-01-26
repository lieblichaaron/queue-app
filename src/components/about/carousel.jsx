import { Carousel } from "react-bootstrap";
import "./carousel.css";

const CarouselComponent = () => {
  const imagePath = `${process.env.PUBLIC_URL}/images/`;
  const imageSize = {
    width: "100%",
    objectFit: "contain"
  };
  const textStyling = {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.2rem",
    textShadow: "-1px -1px #14213D",
    width: "80%",
    textAlign: "center",
  };
  return (
    <div className="mt-4">
      <Carousel>
        <Carousel.Item style={{ position: "relative" }}>
          <div className="carousel-image-container">

          <img
            src={`${imagePath}People-standing-in-line.png`}
            alt="People In Line"
            style={imageSize}
            />
            </div>
          <div style={textStyling}>No time wasted waiting in line</div>
        </Carousel.Item>
        <Carousel.Item style={{ position: "relative" }}>
        <div className="carousel-image-container">
          <img
            src={`${imagePath}Burger-Food-Truck.png`}
            alt="Food Truck"
            style={imageSize}
          />
          </div>
          <div style={textStyling}>Help to avoid overcrowded public places</div>
        </Carousel.Item>
        <Carousel.Item style={{ position: "relative" }}>
        <div className="carousel-image-container">
          <img
            src={`${imagePath}wooden-hut-shop.png`}
            alt="Wooden Hut Shop"
            style={imageSize}
          />
          </div>
          <div style={textStyling}>Perfect for all businesses</div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
