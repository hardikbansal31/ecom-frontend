import React from "react";
import { Carousel } from "react-bootstrap";

import slide1 from "../assets/imgs/chiron.jpeg";
import slide2 from "../assets/imgs/equipe.jpeg";
import slide3 from "../assets/imgs/mistral.png";
import slide4 from "../assets/imgs/pur1.jpeg";
import slide5 from "../assets/imgs/pur2.jpeg";

const images = [
  { src: slide1, alt: "Slide 1" },
  { src: slide2, alt: "Slide 2" },
  { src: slide3, alt: "Slide 3" },
  { src: slide4, alt: "Slide 4" },
  { src: slide5, alt: "Slide 5" },
];

const FeatCarousel = () => {
  return (
    <div>
      <h1 className="text-center my-4">Featured Products</h1>
      <Carousel fade interval={3000}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt}
              style={{ maxHeight: "600px", objectFit: "cover" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default FeatCarousel;
 