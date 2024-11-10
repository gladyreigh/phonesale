  import React, { useState, useEffect, useCallback, useMemo } from 'react';
  import MarketPrice from './MarketPrice';
  import { ChevronLeft, ChevronRight} from 'lucide-react';

  function Products({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('low-to-high');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);


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

    const handleSlideChange = (direction) => {
      if (direction === 'next') {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    };

    useEffect(() => {
      fetchProducts();
      
      // Auto-slide for hero section
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
      }, 5000);

      return () => clearInterval(interval);
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

      // Hero slider content
      const heroSlides = [
        {
          title: "iPhone 15 Pro Max",
          subtitle: "Experience the Revolution",
          image: "https://raw.githubusercontent.com/gladyreigh/phonesale/57134465686bbdcb30b45b976bf0d64f9e7e06d6/public/images/iPhone_15_Pro%20_Max.webp"
        },
        {
          title: "Samsung S24 Ultra",
          subtitle: "Power Meets Innovation",
          image: "https://raw.githubusercontent.com/gladyreigh/phonesale/refs/heads/master/public/images/Samsung%20S24%20Ultra.webp"
        },
        {
          title: "Vivo Y85",
          subtitle: "Budget Meal",
          image: "https://raw.githubusercontent.com/gladyreigh/phonesale/refs/heads/master/public/images/vivoy85.webp"
        }
      ];

    return (
      <>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">

          {/* Main hero content */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-full">
              </div>
              
              <h2 className="text-5xl text-[#1a2942] font-serif mt-16 mb-8">
                Featured Smartphones
              </h2>

              {/* Slider */}
              <div className="relative w-full max-w-4xl mx-auto group">
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <div 
                    className="transition-transform duration-500 ease-out flex"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {heroSlides.map((slide, index) => (
                      <div key={index} className="min-w-full relative">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-[250px] object-cover object-center lg:h-[500px]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                          <div className="p-8 text-white text-left">
                            <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>
                            <p className="text-xl">{slide.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation arrows */}
                  <button 
                    onClick={() => handleSlideChange('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => handleSlideChange('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Slide indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          currentSlide === index 
                            ? 'w-8 h-2 bg-white' 
                            : 'w-2 h-2 bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 max-w-2xl mx-auto">
                <h2 className="text-4xl text-[#1a2942] font-bold mb-4 animate-fade-in">
                  Hello! We are in a sale today, with huge discounts
                </h2>
                <p className="text-gray-600 text-xl">
                  Making the finest gadgets available at reasonable prices!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 py-8 font-['Poppins']">
          <h2 className="text-3xl text-gray-800 text-center mb-8">
            Smartphone Products
          </h2>

          <div className="flex flex-col items-center space-y-4 mb-8">
            <input
              type="text"
              className="w-full md:w-[300px] px-4 py-2 border border-green-500 rounded-full 
                      focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
            />

            <select
              className="w-full md:w-[200px] px-4 py-2 border border-green-500 rounded-full 
                      appearance-none bg-white cursor-pointer transition-all
                      focus:outline-none focus:ring-2 focus:ring-green-200
                      bg-no-repeat bg-[center_right_1rem] bg-[length:1rem]
                      bg-[url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNENBRjUwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNyAxMGw1IDUgNS01eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')]"
              value={sortOption}
              onChange={handleSort}
            >
              <option value="default">Sort by</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {filteredAndSortedProducts.map(product => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center 
                        shadow-md transition-all duration-300 hover:-translate-y-1 
                        hover:shadow-lg flex flex-col h-full"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[150px] md:h-[200px] object-contain mb-4"
                  loading="lazy"
                />

                <h3
                  className="text-sm md:text-base text-gray-800 mb-2 cursor-pointer 
                          group relative"
                  data-fullname={product.name}
                  title={product.name}
                >
                  <span className="group-hover:after:content-[attr(data-fullname)] 
                              group-hover:after:absolute group-hover:after:bottom-full 
                              group-hover:after:left-1/2 group-hover:after:-translate-x-1/2 
                              group-hover:after:bg-black/80 group-hover:after:text-white 
                              group-hover:after:px-2 group-hover:after:py-1 
                              group-hover:after:rounded group-hover:after:text-sm 
                              group-hover:after:whitespace-nowrap group-hover:after:z-10">
                    {product.name}
                  </span>
                </h3>

                <div className="mt-auto">
                  <MarketPrice product={product} />
                  <p className="text-lg md:text-xl font-bold text-red-500 mb-4">
                    {product.price.toFixed(2)} AED
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-full 
                            text-sm transition-colors hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  export default React.memo(Products);