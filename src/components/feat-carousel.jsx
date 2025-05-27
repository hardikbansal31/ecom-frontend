// import React from "react";

// // Import images
// import slide1 from "../assets/imgs/chiron.jpeg";
// import slide2 from "../assets/imgs/equipe.jpeg";
// import slide3 from "../assets/imgs/mistral.png";
// import slide4 from "../assets/imgs/pur1.jpeg";
// import slide5 from "../assets/imgs/pur2.jpeg";

// // Store them in an array
// const images = [
//   { src: slide1, alt: "Slide 1" },
//   { src: slide2, alt: "Slide 2" },
//   { src: slide3, alt: "Slide 3" },
//   { src: slide4, alt: "Slide 4" },
//   { src: slide5, alt: "Slide 5" },
// ];

// const FeatCarousel = () => {
//   return (
//     <>
//     <h1>Featured Products</h1>
//       <div
//         id="carouselExampleAutoplaying"
//         className="carousel slide"
//         data-bs-ride="carousel"
//       >
//         <div className="carousel-inner">
//           {images.map((image, index) => (
//             <div
//               className={`carousel-item${index === 0 ? " active" : ""}`}
//               key={index}
//             >
//               <img src={image.src} className="d-block w-100" alt={image.alt} />
//             </div>
//           ))}
//         </div>

//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#carouselExampleAutoplaying"
//           data-bs-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>

//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#carouselExampleAutoplaying"
//           data-bs-slide="next"
//         >
//           <span
//             className="carousel-control-next-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </>
//   );
// };

// export default FeatCarousel;

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
