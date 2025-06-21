import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const FeatCarousel = ({ products }) => {
  // Extract featured images (e.g. top 3)
  const featured = products; // Or use a filter/flag if needed

  return (
    <div>
      <h1 className="text-center my-4">Featured Products</h1>
      <Carousel fade interval={3000}>
        {featured.length > 0 ? (
          featured.map((product) => (
            <Carousel.Item key={product.id}>
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  className="d-block w-100"
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    maxHeight: "600px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
                <Carousel.Caption>
                  <h5
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {product.name}
                  </h5>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <p className="text-muted">Loading featured images...</p>
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default FeatCarousel;
