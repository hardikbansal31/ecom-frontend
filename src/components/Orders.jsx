// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   ListGroup,
//   Spinner,
//   Button,
//   Image,
// } from "react-bootstrap";

// const TAX_RATE = 0.1; // 10%
// const DELIVERY_CHARGE = 50;

// const Orders = () => {
//   const [ordersGrouped, setOrdersGrouped] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [sortNewestFirst, setSortNewestFirst] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, [sortNewestFirst]);

//   const fetchOrders = async () => {
//     setError("");
//     const userId = localStorage.getItem("user_id");
//     if (!userId) {
//       setError("Please log in first.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5001/api/order/${userId}`);
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Failed to fetch orders.");
//       }

//       const data = await res.json();

//       // Sort orders by created_at date
//       data.sort((a, b) => {
//         if (sortNewestFirst) {
//           return new Date(b.created_at) - new Date(a.created_at);
//         } else {
//           return new Date(a.created_at) - new Date(b.created_at);
//         }
//       });

//       // Group orders by orderId
//       const grouped = {};
//       data.forEach((item) => {
//         if (!grouped[item.orderId]) {
//           grouped[item.orderId] = {
//             created_at: item.created_at,
//             items: [],
//           };
//         }
//         grouped[item.orderId].items.push(item);
//       });

//       setOrdersGrouped(grouped);
//     } catch (err) {
//       console.error("Order fetch error:", err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateOrderTotals = (items) => {
//     const subtotal = items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//     const tax = subtotal * TAX_RATE;
//     const total = subtotal + tax + DELIVERY_CHARGE;
//     return { subtotal, tax, total };
//   };

//   const handleReorder = (orderId) => {
//     alert(`Reorder functionality coming soon for order ${orderId}`);
//     // TODO: Implement reorder logic (e.g. add items back to cart)
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="mb-3">Your Orders</h2>

//       <Button
//         variant="secondary"
//         className="mb-4"
//         onClick={() => setSortNewestFirst((prev) => !prev)}
//       >
//         Sort by: {sortNewestFirst ? "Newest First" : "Oldest First"}
//       </Button>

//       {loading ? (
//         <Spinner animation="border" role="status" className="d-block mx-auto">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       ) : error ? (
//         <p className="text-danger">{error}</p>
//       ) : Object.keys(ordersGrouped).length === 0 ? (
//         <p>You have not placed any orders yet.</p>
//       ) : (
//         Object.entries(ordersGrouped).map(([orderId, order]) => {
//           const { subtotal, tax, total } = calculateOrderTotals(order.items);

//           return (
//             <Row key={orderId} className="mb-5">
//               <Col md={8}>
//                 <h5 className="mb-3">
//                   Order #{orderId} —{" "}
//                   {new Date(order.created_at).toLocaleString("en-IN", {
//                     dateStyle: "medium",
//                     timeStyle: "short",
//                   })}
//                 </h5>
//                 {order.items.map((item, index) => (
//                   <Card
//                     key={index}
//                     className="mb-3 p-3 d-flex flex-row align-items-center"
//                   >
//                     {item.imageUrl && (
//                       <Image
//                         src={item.imageUrl}
//                         alt={item.name}
//                         thumbnail
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           objectFit: "cover",
//                         }}
//                       />
//                     )}

//                     <div className="ms-3 flex-grow-1">
//                       <h5>{item.name}</h5>
//                       <p>Price: ₹{item.price}</p>
//                       <p>Quantity: {item.quantity}</p>
//                     </div>
//                     <div className="d-flex flex-column align-items-end">
//                       <strong>₹{item.price * item.quantity}</strong>
//                     </div>
//                   </Card>
//                 ))}
//               </Col>
//               <Col md={4}>
//                 <Card className="p-3">
//                   <h5 className="mb-3">Order Summary</h5>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item className="d-flex justify-content-between">
//                       <span>Subtotal</span>
//                       <span>₹{subtotal.toFixed(2)}</span>
//                     </ListGroup.Item>
//                     <ListGroup.Item className="d-flex justify-content-between">
//                       <span>Tax (10%)</span>
//                       <span>₹{tax.toFixed(2)}</span>
//                     </ListGroup.Item>
//                     <ListGroup.Item className="d-flex justify-content-between">
//                       <span>Delivery</span>
//                       <span>₹{DELIVERY_CHARGE}</span>
//                     </ListGroup.Item>
//                     <ListGroup.Item className="d-flex justify-content-between fw-bold">
//                       <span>Total</span>
//                       <span>₹{total.toFixed(2)}</span>
//                     </ListGroup.Item>
//                   </ListGroup>

//                   <Button
//                     variant="primary"
//                     className="mt-3 w-100"
//                     onClick={() => handleReorder(orderId)}
//                   >
//                     Reorder
//                   </Button>
//                 </Card>
//               </Col>
//             </Row>
//           );
//         })
//       )}
//     </Container>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Spinner,
  Dropdown,
  Image,
} from "react-bootstrap";

const TAX_RATE = 0.1; // 10%
const DELIVERY_CHARGE = 50;

const Orders = () => {
  const [ordersGrouped, setOrdersGrouped] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortNewestFirst, setSortNewestFirst] = useState(true);

  // Whenever sortNewestFirst changes, re-fetch and re-sort
  useEffect(() => {
    fetchOrders();
  }, [sortNewestFirst]);

  const fetchOrders = async () => {
    setError("");
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setError("Please log in first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/order/${userId}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch orders.");
      }

      const data = await res.json();

      // Sort by created_at date, newest or oldest first
      data.sort((a, b) => {
        if (sortNewestFirst) {
          return new Date(b.created_at) - new Date(a.created_at);
        } else {
          return new Date(a.created_at) - new Date(b.created_at);
        }
      });

      // Group the flat list by orderId
      const grouped = {};
      data.forEach((item) => {
        if (!grouped[item.orderId]) {
          grouped[item.orderId] = {
            created_at: item.created_at,
            items: [],
          };
        }
        grouped[item.orderId].items.push(item);
      });

      setOrdersGrouped(grouped);
    } catch (err) {
      console.error("Order fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateOrderTotals = (items) => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + DELIVERY_CHARGE;
    return { subtotal, tax, total };
  };

  const handleReorder = (orderId) => {
    alert(`Reorder functionality coming soon for order ${orderId}`);
    // TODO: Implement reorder logic, e.g. add items back to cart
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Your Orders</h2>

      {/* 
        Replace the single Button with a Dropdown:
        - Dropdown.Toggle shows the current sort state.
        - Dropdown.Item allows switching between newest/oldest.
      */}
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="secondary" id="sort-dropdown">
          Sort by: {sortNewestFirst ? "Newest First" : "Oldest First"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortNewestFirst(true)}>
            Newest First
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortNewestFirst(false)}>
            Oldest First
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {loading ? (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : Object.keys(ordersGrouped).length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        Object.entries(ordersGrouped).map(([orderId, order]) => {
          const { subtotal, tax, total } = calculateOrderTotals(order.items);

          return (
            // Add align-items-start so both Cols begin at the same top alignment
            <Row key={orderId} className="mb-5 align-items-start">
              <Col md={8}>
                <h5 className="mb-3">
                  Order #{orderId} —{" "}
                  {new Date(order.created_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </h5>
                {order.items.map((item, index) => (
                  <Card
                    key={index}
                    className="mb-3 p-3 d-flex flex-row align-items-center"
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        thumbnail
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <div className="ms-3 flex-grow-1">
                      <h5>{item.name}</h5>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  </Card>
                ))}
              </Col>

              <Col md={4}>
                <Card className="p-3">
                  <h5 className="mb-3">Order Summary</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Tax (10%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Delivery</span>
                      <span>₹{DELIVERY_CHARGE}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between fw-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </ListGroup.Item>
                  </ListGroup>

                  <button
                    className="btn btn-primary mt-3 w-100"
                    onClick={() => handleReorder(orderId)}
                  >
                    Reorder
                  </button>
                </Card>
              </Col>
            </Row>
          );
        })
      )}
    </Container>
  );
};

export default Orders;
