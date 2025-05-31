import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import chiron from '../assets/imgs/chiron.jpeg';
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Spinner,
  Badge,
} from "react-bootstrap";

export default function ProductPg() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("error fetching product", err));
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        {/* Left column: Image + Buttons */}
        <Col md={5}>
          <Image
            src={product.imageUrl || chiron}
            alt={product.name}
            fluid
            rounded
            className="mb-4"
          />
          <Button variant="primary" className="me-2">
            Add to Cart
          </Button>
          <Button variant="success">Buy Now</Button>
        </Col>

        {/* Right column: Details */}
        <Col md={7}>
          <h2>{product.name}</h2>

          {/* Star rating out of 5 */}
          <div className="mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>
                {index < (product.rating || 0) ? "⭐" : "☆"}
              </span>
            ))}
            <Badge bg="secondary" className="ms-2">
              {product.rating || 0}/5
            </Badge>
          </div>

          {/* Link to reviews section */}
          <p>
            <a href="#reviews">Read Reviews</a>
          </p>

          <p>{product.description}</p>
        </Col>
      </Row>

      {/* Reviews section */}
      <Row className="mt-5" id="reviews">
        <Col>
          <h4>Customer Reviews</h4>
          <p>No reviews yet.</p>{" "}
          {/* Replace with actual reviews if available */}
        </Col>
      </Row>
    </Container>
  );
}
