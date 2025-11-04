import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const OrdersView = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock order data - replace with actual API call
 const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 149.99,
    items: [
      { 
        id: 1, 
        name: 'Wireless Headphones', 
        price: 99.99, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop' 
      },
      { 
        id: 2, 
        name: 'Phone Case', 
        price: 25.00, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=150&h=150&fit=crop' 
      }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'Processing',
    total: 79.99,
    items: [
      { 
        id: 3, 
        name: 'Smart Watch', 
        price: 79.99, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop' 
      }
    ]
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'Shipped',
    total: 299.97,
    items: [
      { 
        id: 4, 
        name: 'Laptop', 
        price: 999.99, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop' 
      },
      { 
        id: 5, 
        name: 'Mouse', 
        price: 29.99, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop' 
      }
    ]
  }
];
  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // In a real application, you would make an API call here:
        // const response = await fetch(`/api/orders/${user.id}`);
        // const ordersData = await response.json();
        
        // Using mock data for demonstration
        setTimeout(() => {
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#28a745';
      case 'processing':
        return '#ffc107';
      case 'shipped':
        return '#17a2b8';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="orders-container">
        <div className="login-prompt">
          <h2>Order History</h2>
          <p>Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">
          <h2>Your Orders</h2>
          <div className="spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error">
          <h2>Your Orders</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>Your Orders ({orders.length})</h2>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">Placed on {formatDate(order.date)}</p>
                </div>
                <div className="order-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                  <p className="order-total">Total: ${order.total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="item-image"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-actions">
                <button className="btn-secondary">View Details</button>
                <button className="btn-primary">Reorder</button>
                <button className="btn-secondary">Track Package</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersView;