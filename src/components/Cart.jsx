function Cart({ items = [], onUpdateQuantity, onRemoveItem, onClearCart }) {
  // Quantity is stored on each cart item, so totals are calculated from item price.
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <h1>Your Cart</h1>
        <div className="cart-empty">
          <p>Your cart is empty.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1> 
        <button className="cart-clear-button" type="button" onClick={onClearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>{item.category}</p>
              <strong>${item.price}</strong>
              
            </div>

            {/* Setting quantity below 1 removes the item in App.jsx. */}
            <div className="cart-quantity">
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                aria-label={`Decrease ${item.name} quantity`}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase ${item.name} quantity`}
              >
                +
              </button>
            </div>

            <p className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              className="cart-remove-button"
              type="button"
              onClick={() => onRemoveItem(item.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <span>Subtotal</span>
        <strong>${subtotal.toFixed(2)}</strong>
      </div>
    </section>
  );
}

export default Cart;
