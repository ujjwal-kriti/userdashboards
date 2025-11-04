import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartModal = ({ isOpen, onClose, onProceedToPayment }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal cart-modal">
        <div className="modal-header">
          <h2 className="modal-title">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="close-btn"
          >
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <div style={{color: '#999', fontSize: '18px', marginBottom: '10px'}}>Your cart is empty</div>
              <p style={{color: '#ccc'}}>Add some products to get started!</p>
            </div>
          ) : (
            <div className="modal-content">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">${item.price}</p>
                  </div>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <div className="cart-actions">
              <button
                onClick={onClose}
                className="btn btn-outline"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  onProceedToPayment();
                  onClose();
                }}
                className="btn btn-primary"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;