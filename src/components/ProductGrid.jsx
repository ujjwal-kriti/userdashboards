import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductGrid = ({ products, searchQuery, selectedCategory }) => {
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product);
    
    // Show a brief animation
    const button = e.currentTarget;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => button.style.transform = '', 150);
  };

  return (
    <div className="product-grid">
      {filteredProducts.map(product => (
        <div
          key={product.id}
          className="product-card"
        >
          {/* Product Image */}
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            {product.discount && (
              <div className="discount-badge">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h3 className="product-name">
              {product.name}
            </h3>
            
            <p className="product-description">
              {product.description}
            </p>

            {/* Rating */}
            <div className="product-rating">
              <div className="rating-stars">
                <Star size={16} className="star" fill="currentColor" />
                <span className="rating-text">
                  {product.rating}
                </span>
              </div>
              <span className="rating-count">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="product-price">
              <div className="flex align-center">
                <span className="current-price">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="original-price">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => handleAddToCart(product, e)}
              className="add-to-cart-btn"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      ))}

      {filteredProducts.length === 0 && (
        <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px'}}>
          <div style={{color: '#999', fontSize: '18px', marginBottom: '10px'}}>
            No products found matching your criteria.
          </div>
          <p style={{color: '#ccc'}}>
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;