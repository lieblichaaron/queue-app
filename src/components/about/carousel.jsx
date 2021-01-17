import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  const imagePath = `${process.env.PUBLIC_URL}/images/`;
  return (
    <div className="mt-4">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${imagePath}People-standing-in-line.png`}
            alt="People In Line"
          />
          <Carousel.Caption>
            <h5 style={{ textShadow: "-2px -2px #14213D" }}>
              No time wasted waiting in line
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${imagePath}Burger-Food-Truck.png`}
            alt="Food Truck"
          />

          <Carousel.Caption>
            <h5 style={{ textShadow: "-2px -2px #14213D" }}>
              Help to avoid overcrowded public places
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${imagePath}wooden-hut-shop.png`}
            alt="Wooden Hut Shop"
          />

          <Carousel.Caption>
            <h5 style={{ textShadow: "-2px -2px #14213D" }}>
              Perfect for all businesses
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
