import React, { useState, useEffect } from 'react';

function MarketPrice({ product }) {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentPrice();
  }, [product]); 

  const fetchCurrentPrice = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://marketprice.greygladyreigh.workers.dev/market-price/${encodeURIComponent(product.name)}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentPrice(data.price);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch current price:', errorData);
        setError(`Failed to fetch price: ${errorData.error || response.statusText}`);
        setCurrentPrice('Unknown');
      }
    } catch (error) {
      console.error('Error fetching current price:', error);
      setError(`Error: ${error.message}`);
      setCurrentPrice('Unknown');
    }
    setIsLoading(false);
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : price;
  };

  if (isLoading) return <p>Loading market price...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="market-price">
      <p>Market Price: {formatPrice(currentPrice)} AED</p>
    </div>
  );
}

export default MarketPrice;