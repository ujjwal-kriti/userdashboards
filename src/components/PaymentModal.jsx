import React, { useState } from 'react';
import { X, CreditCard, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const PaymentModal = ({ isOpen, onClose, onPaymentComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderId, setOrderId] = useState('');
  const { cart, getTotalPrice, placeOrder } = useCart();
  const { user } = useAuth();

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    address: user?.address || ''
  });

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Place the order
    const newOrderId = placeOrder(paymentData.address);
    setOrderId(newOrderId);
    setIsProcessing(false);
    setIsSuccess(true);

    // Auto close after success
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      onPaymentComplete();
      setPaymentData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        address: user?.address || ''
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal payment-modal">
        <div className="modal-header">
          <h2 className="modal-title">Payment</h2>
          <button
            onClick={onClose}
            className="close-btn"
          >
            <X size={24} />
          </button>
        </div>

        {isSuccess ? (
          <div className="success-animation">
            <div className="success-icon">
              <Check size={32} />
            </div>
            <h3 className="success-title">Payment Successful!</h3>
            <p className="success-message">Order ID: #{orderId}</p>
            <p className="success-note">You will be redirected shortly...</p>
          </div>
        ) : (
          <div className="modal-content">
            {/* Order Summary */}
            <div className="order-summary">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="summary-items">
                {cart.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="payment-methods">
              <h3 className="font-semibold mb-3">Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <CreditCard size={20} />
                  Credit/Debit Card
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  UPI Payment
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

            <form onSubmit={handlePayment} className="payment-form">
              {paymentMethod === 'card' && (
                <>
                  <div className="form-group">
                    <label className="form-label">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="form-input"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label">
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  value={paymentData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your delivery address"
                  required
                  rows={3}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`btn ${isProcessing ? 'btn-disabled' : ''}`}
                style={{
                  width: '100%',
                  backgroundColor: isProcessing ? '#ccc' : '#4caf50',
                  color: 'white',
                  padding: '15px'
                }}
              >
                {isProcessing ? (
                  <>
                    <div className="loading-spinner" style={{marginRight: '10px'}}></div>
                    Processing Payment...
                  </>
                ) : (
                  `Pay $${getTotalPrice().toFixed(2)}`
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;