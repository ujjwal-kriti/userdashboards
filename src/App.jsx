import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { useAuth } from './contexts/AuthContext';
import { categories, products } from './data/products';

import Header from './components/Header';
import AuthModal from './components/AuthModal';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';
import PaymentModal from './components/PaymentModal';
import OrdersView from './components/OrdersView';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';

function AppContent() {
  const [currentView, setCurrentView] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const { user } = useAuth();

  const handleViewChange = (view) => {
    if (!user && (view === 'orders' || view === 'profile' || view === 'settings')) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentView(view);
  };

  const handleOpenCart = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCartModalOpen(true);
  };

  const handleProceedToPayment = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = () => {
    setCurrentView('orders');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'orders':
        return <OrdersView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      case 'products':
      default:
        return (
          <div className="products-section">
            {/* Category Filter */}
            <div className="mb-5">
              <div className="category-filters mb-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-btn ${
                      selectedCategory === category
                        ? 'active'
                        : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="section-header">
                <h2 className="section-title">
                  {selectedCategory === 'All Categories' ? 'All Products' : selectedCategory}
                </h2>
                <span className="product-count">
                  {products.filter(product => {
                    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
                    return matchesSearch && matchesCategory;
                  }).length} products
                </span>
              </div>
            </div>

            <ProductGrid
              products={products}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          </div>
        );
    }
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f5f5f5'}}>
      <Header
        onSearch={setSearchQuery}
        onOpenCart={handleOpenCart}
        currentView={currentView}
        onViewChange={handleViewChange}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {renderCurrentView()}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onProceedToPayment={handleProceedToPayment}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;