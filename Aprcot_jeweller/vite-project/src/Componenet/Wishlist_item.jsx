import React from 'react';
import { useAddCartMutation, useDeleteWhishlistMutation } from '../services/apiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Wishlist_item = ({
  image,
  name,
  price,
  whishid,
  diamond_details,
  metal,
  product,
  product_slug,
  total_carat_weight,
  color,
  shape,
  refetch, // ✅ receive refetch
}) => {
  const [deletewhish, { isLoading }] = useDeleteWhishlistMutation();

  const removewhish = async (id) => {
    try {
      const formData = new FormData();
      formData.append("wishlist_id", id);

      await deletewhish(formData).unwrap();

      toast.success("Wishlist item removed successfully", {
          position: "bottom-center",
        autoClose: 1500,
      });

      setTimeout(() => {
        refetch();
      }, 100); // small delay
    } catch (error) {
      toast.error(error?.message || "Failed to remove item.",{
          position: "bottom-center",
         autoClose: 1500,
      });
    }
  };

  const [addtocart] = useAddCartMutation()
  const navigate = useNavigate()
  const addtocarts = async () => {
    try {
      const filePath = image;
      let imageBlob = null;

      // ✅ Fetch image from backend path (convert string to binary blob)
      if (typeof filePath === "string") {
        const response = await fetch(filePath);
        imageBlob = await response.blob();
      }


      // ✅ Validate blob (relaxed check)
      if (!imageBlob || !(imageBlob instanceof Blob)) {
        toast.error("Invalid image data",{
            position: "bottom-center",
           autoClose: 1500,
           
        });
        return;
      }

      // Optional: Preview image in UI


      // ✅ Prepare FormData
      let formData = new FormData();
      formData.append("product_id", product);
      formData.append("quantity", 1);
      formData.append("diamond_id", diamond_details);
      formData.append("metal_id", metal);
      formData.append("total_price", price);
      // formData.append("product_img", imageBlob); // ✅ send as binary with filename
      formData.append("is_wishlist ", 'True'); // ✅ send as binary with filename
      formData.append("wishlist_id ", whishid); // ✅ send as binary with filename





      // ✅ Send to backend
      await addtocart(formData).unwrap();
      navigate('/cart')

    } catch (error) {
      toast.error(error?.data?.message || "Failed to add to cart",{
          position: "bottom-center",
         autoClose: 1500,
      });
    }
  }


  return (

    <div className="h-auto">
      <div className='flex flex-col sm:flex-row w-full mx-auto border-t border-b border-gray-400 px-5 py-5 gap-5 sm:items-center justify-between max-md:flex-wrap'>
        {/* Product Image & Details */}
        <div className='flex flex-col sm:flex-row gap-5 max-xl:gap-3 w-full'>
          <div className='w-[200px] max-md:w-[120px] max-sm:w-full flex justify-center sm:justify-start cursor-pointer' onClick={() => navigate(`/product/${product_slug}`, {
            state: { productid: product }
          })}>

            <img
              src={`https://srv963148.hstgr.cloud:10443` + image}
              alt={name}
              className="w-[200px] h-[200px] max-md:w-[120px] max-md:h-[120px] rounded-[30px] max-md:rounded-[10px] object-cover"
            />

          </div>

          <div className='flex flex-col justify-center'>
            <span className="text-[23px] font-bold mb-2 max-lg:text-[17px] cursor-pointer" onClick={() => navigate(`/product/${product_slug}`, {
            state: { productid: product }
          })}>{name}</span>

            <div className="mb-2 text-[18px] max-lg:text-[16px]">
              <span className="font-medium">Total Price:</span> ₹{price}
            </div>



            <div className="mb-1 text-[17px] max-xl:text-[15px]">
              <span className="font-semibold text-gray-500">Metal Type:</span> {color}
            </div>

            <div className="text-[17px] max-xl:text-[15px]">
              <span className="font-semibold text-gray-500">Diamond Shape:</span> {shape}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='w-full sm:w-auto flex justify-center sm:justify-end mt-4 sm:mt-0 gap-5 max-sm:flex-col'>
          <button onClick={addtocarts} className='bg-[#D86A37] px-10 py-3 rounded-[10px] text-white font-bold w-full max-sm:w-full text-nowrap'>
            Add To Cart
          </button>
          <div>

            <button
              disabled={isLoading}
              onClick={() => removewhish(whishid)}
              className={`max-lg:border max-lg:border-gray-400 px-7 py-3 rounded-[10px] flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 w-full justify-center ${isLoading ? 'max-lg:opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <svg
                className='max-lg:hidden flex items-center justify-center'
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
              </svg>
              <span className='hidden max-lg:block'>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Wishlist_item;
