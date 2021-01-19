import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  const imagePath = `${process.env.PUBLIC_URL}/images/`;
  const imageSize = { height: "12rem", width: "20rem" };
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
          <img
            className="d-block w-100"
            src={`${imagePath}People-standing-in-line.png`}
            alt="People In Line"
            style={imageSize}
          />
          <div style={textStyling}>No time wasted waiting in line</div>
        </Carousel.Item>
        <Carousel.Item style={{ position: "relative" }}>
          <img
            className="d-block w-100"
            src={`${imagePath}Burger-Food-Truck.png`}
            alt="Food Truck"
            style={imageSize}
          />
          <div style={textStyling}>Help to avoid overcrowded public places</div>
        </Carousel.Item>
        <Carousel.Item style={{ position: "relative" }}>
          <img
            className="d-block w-100"
            src={`${imagePath}wooden-hut-shop.png`}
            alt="Wooden Hut Shop"
            style={imageSize}
          />
          <div style={textStyling}>Perfect for all businesses</div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
