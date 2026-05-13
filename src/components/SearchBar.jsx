import { useMemo, useState } from "react";

function SearchBar({ products, onFilter, filterMode = "price" }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [notification, setNotification] = useState("");

  const productList = useMemo(() => products || [], [products]);

  const categories = useMemo(() => {
    const productCategories = productList
      .map((product) => product.category)
      .filter(Boolean);

    return ["All", ...new Set(productCategories)];
  }, [productList]);

  const filters =
    filterMode === "admin"
      ? ["All", "In Stock", "Best Selling", "Discount"]
      : ["All", "Under $50", "$50 - $100", "Over $100"];

  const handleFiltering = (searchValue, categoryValue, priceFilterValue) => {
    let filteredProducts = [...productList];

    if (searchValue.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name
          ?.toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }

    if (categoryValue !== "All") {
      filteredProducts = filteredProducts.filter((product) =>
        product.category === categoryValue
      );
    }

    if (priceFilterValue === "Under $50") {
      filteredProducts = filteredProducts.filter((product) => product.price < 50);
    } else if (priceFilterValue === "$50 - $100") {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= 50 && product.price <= 100
      );
    } else if (priceFilterValue === "Over $100") {
      filteredProducts = filteredProducts.filter((product) => product.price > 100);
    } else if (priceFilterValue === "In Stock") {
      filteredProducts = filteredProducts.filter(
        (product) => product.inStock !== false && product.stock !== 0
      );
    } else if (priceFilterValue === "Best Selling") {
      filteredProducts = filteredProducts.filter(
        (product) => product.bestSelling || product.bestSeller || product.isBestSelling
      );
    } else if (priceFilterValue === "Discount") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.discount ||
          product.onSale ||
          Number(product.discountPercentage) > 0
      );
    }

    setNotification(
      searchValue.trim() !== "" && filteredProducts.length === 0
        ? "Product not found"
        : ""
    );

    onFilter?.(filteredProducts);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    handleFiltering(value, category, priceFilter);
  };

  const handleSearchClick = () => {
    handleFiltering(search, category, priceFilter);
  };

  return (
    <div className="search-wrapper">

      <div className="search-section">
        <h2>Shop Products</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
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

      <div className="categories-section">
        <h3>Categories</h3>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFiltering(search, e.target.value, priceFilter);
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

      <div className="filters-section">
        <h3>Filter</h3>

        <select
          value={priceFilter}
          onChange={(e) => {
            setPriceFilter(e.target.value);
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

      {notification && (
        <p className="notification-message">
          {notification}
        </p>
      )}
    </div>
  );
}

export default SearchBar;
