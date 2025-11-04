import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header = ({ onSearch, onOpenCart, currentView, onViewChange, onOpenAuth }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleViewChange = (view) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div 
            className="logo"
            onClick={() => handleViewChange('products')}
          >
            <ShoppingCart size={32} />
            <h1>FlipMart</h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-container">
            <div className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="search-input"
              />
              <button
                type="submit"
                className="search-btn"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {user ? (
              <>
                <button
                  onClick={() => handleViewChange('products')}
                  className={`nav-link ${
                    currentView === 'products' ? 'active' : ''
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => handleViewChange('orders')}
                  className={`nav-link ${
                    currentView === 'orders' ? 'active' : ''
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={onOpenCart}
                  className="cart-icon"
                >
                  <ShoppingCart size={24} />
                  {getTotalItems() > 0 && (
                    <span className="cart-badge">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
                <div className="user-menu">
                  <button className="nav-link flex align-center">
                    <User size={24} />
                    <span>{user.name}</span>
                  </button>
                  <div className="user-dropdown">
                    <button
                      onClick={() => handleViewChange('profile')}
                      className="dropdown-item"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleViewChange('settings')}
                      className="dropdown-item"
                    >
                      Settings
                    </button>
                    <button
                      onClick={logout}
                      className="dropdown-item danger"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={onOpenAuth}
                className="btn btn-secondary"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="mobile-search">
          <form onSubmit={handleSearch}>
            <div className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="search-input"
              />
              <button
                type="submit"
                className="search-btn"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'show' : ''}`}>
          <div>
              {user ? (
                <>
                  <button
                    onClick={() => handleViewChange('products')}
                    className="mobile-nav-item"
                  >
                    Products
                  </button>
                  <button
                    onClick={() => handleViewChange('orders')}
                    className="mobile-nav-item"
                  >
                    Orders
                  </button>
                  <button
                    onClick={onOpenCart}
                    className="mobile-nav-item"
                  >
                    Cart ({getTotalItems()})
                  </button>
                  <button
                    onClick={() => handleViewChange('profile')}
                    className="mobile-nav-item"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => handleViewChange('settings')}
                    className="mobile-nav-item"
                  >
                    Settings
                  </button>
                  <button
                    onClick={logout}
                    className="mobile-nav-item"
                    style={{color: '#f44336'}}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="btn btn-secondary"
                  style={{width: '100%', marginTop: '10px'}}
                >
                  Login
                </button>
              )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;