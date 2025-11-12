import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, clearToken } from "./authtoken"; // Import Redux actions

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://192.168.1.7:8051/",
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.token;
      if (token && endpoint !== "loginUser" && endpoint !== "registerUser") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),







  endpoints: (builder) => ({
    //regietr user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'register/',
        method: 'POST',
        body: userData,
      }),
    }),
    Forgot_password: builder.mutation({
      query: (userData) => ({
        url: 'forgot-password/',
        method: 'PUT',
        body: userData,
      }),
    }),

    // ✅ Login
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "login/",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access) {
            dispatch(setToken(data.access)); // ✅ Store token in Redux
          }
        } catch (error) {
          console.error("Login Failed:", error);
        }
      },
    }),

    getProfile: builder.query({
      query: () => "profile/",
      providesTags: ["Profile"], // ✅ Add tag for automatic refetch
    }),

    // ✅ Fetch Categories
    getCategories: builder.query({
      query: () => "view-categories/",
      providesTags: ["Category"], // ✅ Add tag for automatic refetch
    }),

    // ✅ Add Category
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "add-category/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"], // ✅ Auto refetch categories
    }),

    // ✅ Edit Category
    editCategory: builder.mutation({
      query: ({ formData }) => ({
        url: `update-category/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),



    // ✅ Delete Category
    deleteCategory: builder.mutation({
      query: (formdata) => ({
        url: `delete-category/`,
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Category"], // ✅ Auto refetch categories
    }),



    getSubCategories: builder.query({
      query: ({ category_id } = {}) => {
        const params = new URLSearchParams();

        if (category_id) params.append("category_id", category_id);

        const queryString = params.toString();
        return `view-subcategories/${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ["Subcategory"], // ✅ Add tag for automatic refetch
    }),

    addSubCategory: builder.mutation({
      query: (formData) => ({
        url: "add-subcategory/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Subcategory"], // ✅ Auto refetch categories
    }),

    // ✅ Edit Category
    editSubCategory: builder.mutation({
      query: (formData) => ({
        url: "update-subcategory/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Subcategory"], // ✅ Auto refetch categories
    }),

    // ✅ Delete Category
    deleteSubCategory: builder.mutation({
      query: (formData) => ({
        url: `delete-subcategory/`,
        method: "DELETE",
        body: formData,
      }),
      invalidatesTags: ["Subcategory"], // ✅ Auto refetch categories
    }),


    getProduct: builder.query({
      query: ({ product_id, page, page_size, search_query } = {}) => {
        const params = new URLSearchParams();

        if (product_id) params.append("product_id", product_id);
        if (page) params.append("page", page);
        if (page_size) params.append("page_size", page_size);
        if (search_query) params.append("search_query", search_query);

        const queryString = params.toString();
        return `view-products/${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ["Product"],
    }),

    getProducts11: builder.query({
      query: () => {

        return `view-products/`;
      },
      providesTags: ["Product11"],
    }),



    addProduct: builder.mutation({
      query: (formData) => ({
        url: "add-product/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"], // ✅ Auto refetch categories
    }),

    // ✅ Edit Category
    editProduct: builder.mutation({
      query: (formData) => ({
        url: "update-product/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"], // ✅ Auto refetch categories
    }),

    // ✅ Delete Category
    deleteProduct: builder.mutation({
      query: (formdata) => ({
        url: `delete-product/`,
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Product"], // ✅ Auto refetch categories
    }),

    addDiamond: builder.mutation({
      query: (formData) => ({
        url: "add-diamond/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Diamond", 'Product11'],
    }),

    getDiamond: builder.query({
      query: ({ diamond_id, product_id, vpo } = {}) => {
        const params = new URLSearchParams();

        if (diamond_id) params.append("diamond_id", diamond_id);
        if (product_id) params.append("product_id", product_id);
        if (vpo) params.append("vpo", vpo);

        const queryString = params.toString();
        return `view-diamonds/${queryString ? "?" + queryString : ""}`;
      },
      providesTags: ["Diamond"],
    }),





    editDiamond: builder.mutation({
      query: (formData) => ({
        url: "update-diamond/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Diamond", 'Product11'],
    }),

    deleteDiamond: builder.mutation({
      query: (id) => {
        const formData = new FormData();
        formData.append("diamond_id", id);

        return {
          url: `delete-diamond/`,
          method: "DELETE",
          body: formData,
        };
      },
      invalidatesTags: ["Diamond", 'Product11'],
    }),


    addMetal: builder.mutation({
      query: (formData) => ({
        url: "add-metal/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Metal"],
    }),

    getMetal: builder.query({
      query: ({ metal_id, product_id } = {}) => {
        if (metal_id) {
          return `/view-metal/?metal_id=${metal_id}`;
        } else if (product_id) {
          return `/view-metal/?product_id=${product_id}`;
        } else {
          return "/view-metal/"; // Default endpoint if no id is provided
        }
      },
      providesTags: ["Metal"],
    }),




    editMetal: builder.mutation({
      query: (formData) => ({
        url: "update-metal/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ['Metal'],
    }),


    deleteMetal: builder.mutation({
      query: (id) => {
        const formData = new FormData();
        formData.append("metal_id", id);

        return {
          url: `delete-metal/`,
          method: "DELETE",
          body: formData,
        };
      },
      invalidatesTags: ["Metal"],
    }),

    addProductMedia: builder.mutation({
      query: (formData) => {
        // Log FormData entries
        console.log("FormData sent to add-product-media:");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        return {
          url: 'add-product-media/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Product_Media'],
    }),


    getProdctMedia: builder.query({
      query: ({ product_media_id, product_id } = {}) => {
        if (product_media_id) return `view-product-media/?product_media_id=${product_media_id}`;
        if (product_id) return `view-product-media/?product_id=${product_id}`;
        return "view-product-media/";
      },
      providesTags: ["Product_Media"],
    }),


    editProdctMedia: builder.mutation({
      query: (formData) => ({
        url: "update-product-media/",
        method: "PUT",
        body: formData,
      }),


      invalidatesTags: ["Product_Media"],
    }),


    deleteProductMedia: builder.mutation({
      query: (id) => {
        const formData = new FormData();
        formData.append("product_media_id", id);

        return {
          url: `delete-product-media/`,
          method: "DELETE",
          body: formData,
        };
      },
      invalidatesTags: ["Product_Media"],
    }),

    getAddress: builder.query({
      query: (username) =>
        username ? `view-addresses/?address_id=${username}` : `view-addresses/`,
      providesTags: ["Address"],
    }),
    getAddressUsername: builder.query({
      query: (username) =>
        username ? `view-addresses/?username=${username}` : `view-addresses/`,
      providesTags: ["Address"],
    }),

    getWishlist: builder.query({
      query: (username) =>
        username ? `view-wishlist/?username=${username}` : `view-wishlist/`,
      providesTags: ["Wishlist"],
    }),

    getCart: builder.query({
      query: (username) =>
        username ? `view-cart/?username=${username}` : `view-cart/`,
      providesTags: ["Cart"],
    }),

    getOrder: builder.query({
      query: ({ username, status, payment_status } = {}) => {
        let params = new URLSearchParams();

        if (username) params.append("username", username);
        if (status) params.append("status", status);
        if (payment_status) params.append("payment_status", payment_status);

        // Always add is_all=true
        params.append("is_all", "true");

        return `view-order/?${params.toString()}`;
      },
      providesTags: ["Order"],
    }),

    getOrderUsername: builder.query({
      query: (username) =>
        username ? `view-order/?username=${username}` : `view-order/`,
      providesTags: ["Order"],
    }),



    getUser: builder.query({
      query: () => "/profile/?is_all=true",
      providesTags: ["User"], // ✅ Add tag for automatic refetch
    }),


    getAppoinment: builder.query({
      query: (date) => {
        const baseUrl = "view-appointments/?is_contact_us=false";
        return date ? `${baseUrl}?appointment_date=${date}` : baseUrl;
      },
      providesTags: ["Appoinment"],
    }),


    getContact: builder.query({
      query: (date) => {
        const baseUrl = "view-appointments/?is_contact_us=true";
        return baseUrl
      },
      providesTags: ["Contat"],
    }),

    getTop_product: builder.query({
      query: (date) => {
        return "top-products/";
      },
      providesTags: ["Top_product"],
    }),


    editOrder: builder.mutation({
      query: (formData) => ({
        url: "update-order/",
        method: "PUT",
        body: formData,
      }),


      invalidatesTags: ["Order"],
    }),



  }),
});

// Export hooks for components
export const {
  useRegisterUserMutation,
  useForgot_passwordMutation,
  useLoginUserMutation,
  useGetCategoriesQuery,
  useGetProfileQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetSubCategoriesQuery,
  useAddSubCategoryMutation,
  useEditSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetProductQuery,
  useGetProducts11Query,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useAddDiamondMutation,
  useGetDiamondQuery,
  useEditDiamondMutation,
  useDeleteDiamondMutation,
  useGetMetalQuery,
  useAddMetalMutation,
  useEditMetalMutation,
  useDeleteMetalMutation,
  useAddProductMediaMutation,
  useGetProdctMediaQuery,
  useEditProdctMediaMutation,
  useDeleteProductMediaMutation,
  useGetAddressQuery,
  useGetUserQuery,
  useGetWishlistQuery,
  useGetCartQuery,
  useGetOrderQuery,
  useGetOrderUsernameQuery,
  useGetAddressUsernameQuery,
  useGetAppoinmentQuery,
  useGetContactQuery,
  useGetTop_productQuery,
  useLazyGetCategoriesQuery,
  useLazyGetSubCategoriesQuery,
  useLazyGetProductQuery,
  useLazyGetUserQuery,
  useLazyGetOrderQuery,
  useLazyGetAppoinmentQuery,
  useLazyGetContactQuery,
  useLazyGetTop_productQuery,
  useLazyGetDiamondQuery,
  useLazyGetMetalQuery,
  useLazyGetProdctMediaQuery,
  useEditOrderMutation,

} = apiSlice;
