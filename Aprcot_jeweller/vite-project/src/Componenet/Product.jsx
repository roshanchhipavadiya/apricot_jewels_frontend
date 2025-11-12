import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetProductidQuery, useGetCategoriesQuery } from "../services/apiSlice";

const Product = ({ image, name, price, productId, category, currentpages, gifted_page,slug }) => {
    const navigate = useNavigate();
    const [loadProduct, { isFetching }] = useLazyGetProductidQuery();
    const { data: catata } = useGetCategoriesQuery();
    const [loading, setLoading] = useState(false);

  

    const catename = catata?.data?.find((val) => val.category === category)?.name;
    const slugName = slug

    const handleProductClick = async () => {
        setLoading(true);
        try {
            const result = await loadProduct(productId).unwrap();
            if (result) {


                sessionStorage.setItem("product_page", currentpages || 1)


                sessionStorage.setItem("gifted_page", gifted_page || 1)

                navigate(`/product/${slugName}`, {
                    state: { productid: productId, productData: result },
                });
            }
        } catch (err) {
            console.error("Failed to fetch product:", err);
            alert("Failed to load product details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`cursor-pointer relative ${loading ? 'opacity-60 pointer-events-none' : ''}`}
            onClick={handleProductClick}
        >
            {/* Spinner Overlay */}
            {loading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-[30px]">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Product Image */}
            <img
                src={`https://srv963148.hstgr.cloud:10443${image}`}
                alt={name}
                className="aspect-[3/3] mb-4 h-[300px] w-[300px] object-cover rounded-[30px] max-xl:h-[240px] max-sm:h-auto max-sm:rounded-[15px] max-md:w-full max-sm:max-h-[100%] max-sm:max-w-[100%]"
            />

            {/* Product Info */}
            <div>
                <span className="block font-semibold text-[18px] text-[#222] mb-2 max-sm:text-[13px] max-sm:mb-1">
                    {name}
                </span>
                <div className="flex justify-between items-center max-sm:block">
                    <div className="flex items-center gap-2 max-sm:gap-[1.5]">
                        <strong className="text-[20px] font-bold text-[#D86A37] max-xl:text-[17px] max-sm:text-[15px]">
                            ₹{parseInt(price)}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
