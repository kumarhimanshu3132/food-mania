import React, { useState, useEffect, useRef } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import toast from 'react-hot-toast'; 

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  
  let options = props.options || {};
  let priceOptions = Object.keys(options);
  
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions.length > 0 ? priceOptions[0] : "");

  let finalPrice = qty * parseInt(options[size] ? options[size] : 0);

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img
    });
    
    toast.success(`${props.foodItem.name} added to your cart! 😋`);
    
    console.log(data); 
  };
  
  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem" }}>
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt={props.foodItem.name}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            
            <div className="w-100 d-flex align-items-center">
              
              <select
                className="me-2 h-100 bg-success rounded"
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              
              <select
                className="me-2 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>

              <div className="h-100 fs-5 ms-auto">₹{finalPrice}/-</div>
            </div>
            
            <hr />
            <button
              className={"btn btn-success justify-center ms-2"}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}