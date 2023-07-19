import React, { useState, useEffect } from "react";

const Seller = () => {
  const [productId, setProductId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("category1");
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [foodProducts, setFoodProducts] = useState([]);
  const [skincareProducts, setSkincareProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const electronics = storedProducts.filter(
      (product) => product.category === "category1"
    );
    const food = storedProducts.filter(
      (product) => product.category === "category2"
    );
    const skincare = storedProducts.filter(
      (product) => product.category === "category3"
    );

    setElectronicsProducts(electronics);
    setFoodProducts(food);
    setSkincareProducts(skincare);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const product = {
      productId,
      sellingPrice,
      productName,
      category,
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    existingProducts.push(product);

    localStorage.setItem("products", JSON.stringify(existingProducts));

    const electronics = existingProducts.filter(
      (product) => product.category === "category1"
    );
    const food = existingProducts.filter(
      (product) => product.category === "category2"
    );
    const skincare = existingProducts.filter(
      (product) => product.category === "category3"
    );
    console.log(electronics);
    setElectronicsProducts(electronics);
    setFoodProducts(food);
    setSkincareProducts(skincare);
  };

  console.log(electronicsProducts);
  const handleProductDelete = (productId, category) => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts = existingProducts.filter(
      (product) =>
        product.productId !== productId && product.category !== category
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    const electronics = updatedProducts.filter(
      (product) => product.category === "category1"
    );
    const food = updatedProducts.filter(
      (product) => product.category === "category2"
    );
    const skincare = updatedProducts.filter(
      (product) => product.category === "category3"
    );

    setElectronicsProducts(electronics);
    setFoodProducts(food);
    setSkincareProducts(skincare);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label> Product Id : </label>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <label> Selling Price : </label>
        <input
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />

        <label>Product Name : </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label> Choose a Category : </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="category1">Electronics</option>
          <option value="category2">Food Items</option>
          <option value="category3">SkinCare Items</option>
        </select>

        <button type="submit">Add Product</button>
      </form>

      <div>
        <h2>Electronics:</h2>
        <ul>
          {electronicsProducts.map((product, index) => (
            <li key={index}>
              {product.productName} - ${product.sellingPrice}
              <button
                onClick={() =>
                  handleProductDelete(product.productId, product.category)
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Food Items:</h2>
        <ul>
          {foodProducts.map((product, index) => (
            <li key={index}>
              {product.productName} - ${product.sellingPrice}
              <button
                onClick={() =>
                  handleProductDelete(product.productId, product.category)
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>SkinCare Items:</h2>
        <ul>
          {skincareProducts.map((product, index) => (
            <li key={index}>
              {product.productName} - ${product.sellingPrice}
              <button
                onClick={() =>
                  handleProductDelete(product.productId, product.category)
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Seller;
