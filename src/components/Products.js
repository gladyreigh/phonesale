import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './Products.module.css';
import MarketPrice from './MarketPrice';

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('low-to-high');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cache = await caches.open('products-cache');
      const cachedResponse = await cache.match('https://rees.greygladyreigh.workers.dev/products');
      
      if (cachedResponse) {
        const result = await cachedResponse.json();
        setProducts(mapProducts(result.data));
        setIsLoading(false);
        
        // Fetch fresh data in the background
        fetchFreshData(cache);
      } else {
        await fetchFreshData(cache);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
      setIsLoading(false);
    }
  }, []);

  const fetchFreshData = async (cache) => {
    const response = await fetch('https://rees.greygladyreigh.workers.dev/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    cache.put('https://rees.greygladyreigh.workers.dev/products', new Response(JSON.stringify(result)));
    setProducts(mapProducts(result.data));
    setIsLoading(false);
  };

  const mapProducts = (data) => {
    return data.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSort = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortOption === 'low-to-high') return a.price - b.price;
        if (sortOption === 'high-to-low') return b.price - a.price;
        return 0;
      });
  }, [products, searchQuery, sortOption]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className={styles.productsSection}>
      <h2 className={styles.title}>Our Products</h2>
      <div className={styles.controls}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select 
          className={styles.sortOptions} 
          value={sortOption} 
          onChange={handleSort}
        >
          <option value="default">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
      <div className={styles.productGrid}>
        {filteredAndSortedProducts.map(product => (
          <div className={styles.productCard} key={product.id}>
            <img src={product.image} alt={product.name} className={styles.productImage} loading="lazy" />
            <h3 
              className={styles.productName} 
              data-fullname={product.name}
              title={product.name}
            >
              {product.name}
            </h3>
            <div className={styles.priceContainer}>
              <MarketPrice product={product} />
              <p className={styles.price}>{product.price.toFixed(2)} AED</p>
            </div>
            <button 
              className={styles.addToCartButton} 
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Products);