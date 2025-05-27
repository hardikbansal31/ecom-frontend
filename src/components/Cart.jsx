import React, { useState, useEffect, useRef } from "react";
import { Toast } from "bootstrap";
import { Link } from "react-router-dom";

const TAX_RATE = 0.1;
const DELIVERY_CHARGE = 50;

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product A",
      price: 500,
      quantity: 2,
      imageUrl: "null",
    },
    {
      id: 2,
      name: "Product B",
      price: 300,
      quantity: 1,
      imageUrl: "null",
    },
  ]);

  const [toastMessage, setToastMessage] = useState("");
  const toastRef = useRef(null);

  const showToast = (message) => {
    setToastMessage(message);
    const toastEl = toastRef.current;

    if (toastEl) {
      const bsToast = new Toast(toastEl);
      bsToast.show();
    }
  };


  const isEmpty = cartItems.length === 0;

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    const removedItem = cartItems.find((item) => item.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`${removedItem.name} removed from cart`);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + (isEmpty ? 0 : DELIVERY_CHARGE);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      {/* Bootstrap Toast */}
      <div
        ref={toastRef}
        className="toast position-fixed bottom-0 end-0 m-4"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Cart</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{toastMessage}</div>
      </div>

      <div className="row">
        {/* Left Column */}
        <div className="col-md-8">
          {isEmpty ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="card mb-3 p-3 d-flex flex-row align-items-center"
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-thumbnail"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <div className="ms-3 flex-grow-1">
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1">Price: ₹{item.price}</p>
                  <div className="d-flex align-items-center">
                    <label className="me-2">Qty:</label>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        readOnly
                        className="form-control text-center"
                        style={{ width: "50px" }}
                        value={item.quantity}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <strong className="mb-2">
                    ₹{item.price * item.quantity}
                  </strong>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column - Summary */}
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="mb-3">Cost Breakdown</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Items ({cartItems.length})</span>
                <span>₹{subtotal}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Delivery</span>
                <span>₹{isEmpty ? 0 : DELIVERY_CHARGE}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </li>
            </ul>
            <button
              className="btn btn-success mt-3 w-100"
              disabled={isEmpty}
              onClick={() => alert("Proceeding to checkout...")}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
