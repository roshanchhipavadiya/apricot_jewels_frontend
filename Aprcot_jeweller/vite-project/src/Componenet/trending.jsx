import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetProductidQuery } from "../services/apiSlice";

const TrendingProducts = ({ trendingData }) => {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [fetchProduct] = useLazyGetProductidQuery();

  const handleClick = async (item) => {
    setSelectedProductId(item.product_id);

    try {
      const data = await fetchProduct(item.product_id).unwrap();
      if (data) {
        const slug = item.slug

        navigate(`/product/${slug}`, {
          state: {
            productid: item.product_id,
            productData: data
          }
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product details.");
    } finally {
      setSelectedProductId(null);
    }
  };

  return (
    <>
      {trendingData?.length > 0 ? (
        trendingData.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className={`flex cursor-pointer flex-col items-center relative ${selectedProductId === item.product_id ? 'pointer-events-none opacity-50' : ''}`}
            onClick={() => handleClick(item)}
          >
            {/* Loader for clicked item */}
            {selectedProductId === item.product_id && (
              <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-[30px]">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <img
              src={`https://srv963148.hstgr.cloud:10443${item.product_img}`}
              alt={item.name}
              title={item.name}
              className="aspect-[3/3] max-h-[250px] w-full max-sm:rounded-[15px] rounded-[30px] object-cover"
            />
            <h5 className="font-semibold text-[20px] leading-[100%] text-center my-[17px]">
              {item.name}
            </h5>
          </div>
        ))
      ) : (
        <p>No trending products found</p>
      )}
    </>
  );
};

export default TrendingProducts;
