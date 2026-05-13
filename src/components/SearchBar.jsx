import { useState } from "react";

function SearchBar({ products, onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState("All");
  const [notification, setNotification] = useState("");

  const categories = [
    "All",
    "Watches",
    "Phones",
    "Stationery",
    "Kids",
    "Beauty",
    "Clothing",
    "Gaming",
  ];

  const filters = [
    "All",
    "In Stock",
    "On Sale",
    "New Arrivals",
    "Best Sellers",
  ];

  // MAIN FILTER FUNCTION
  const handleFiltering = (searchValue, categoryValue, filterValue) => {
    let filteredProducts = [...products];

    // SEARCH FILTER
    if (searchValue.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }

    // CATEGORY FILTER (IMPORTANT FIX)
    if (categoryValue !== "All") {
      filteredProducts = filteredProducts.filter((product) =>
        product.category
          ?.toLowerCase()
          .includes(categoryValue.toLowerCase())
      );
    }

    // EXTRA FILTER
    if (filterValue !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.filter === filterValue
      );
    }

    // EMPTY SEARCH STATE
    if (searchValue.trim() === "") {
      setNotification("🔍 Start typing to search products...");
    }

    // ❌ NOT FOUND STATE (FIXED LOGIC)
    else if (filteredProducts.length === 0) {
      setNotification("❌ Product Not Found");
    }

    // CLEAR MESSAGE
    else {
      setNotification("");
    }

    onFilter(filteredProducts);
  };

  // SEARCH BUTTON
  const handleSearchClick = () => {
    handleFiltering(search, category, filter);
  };

  return (
    <div className="search-wrapper">

      {/* SEARCH BAR */}
      <div className="search-section">
        <h2>🛍 Shop Products</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <button
            onClick={handleSearchClick}
            className="search-button"
          >
            Search
          </button>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="categories-section">
        <h3>📂 Categories</h3>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFiltering(search, e.target.value, filter);
          }}
          className="select-box"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* FILTER SECTION */}
      <div className="filters-section">
        <h3>⚙ Filters</h3>

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            handleFiltering(search, category, e.target.value);
          }}
          className="select-box"
        >
          {filters.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* NOTIFICATIONS */}
      {notification && (
        <p className="notification-message">
          {notification}
        </p>
      )}
    </div>
  );
}

export default SearchBar;