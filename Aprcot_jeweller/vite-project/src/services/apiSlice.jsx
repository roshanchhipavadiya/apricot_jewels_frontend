import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://192.168.1.6:8051",
    baseUrl: "https://srv963148.hstgr.cloud:10443",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("aprifrontoken");


      const protectedEndpoints = ["addwhishlist", 'getAppoinment', 'getAllCateProduct', 'addAppoinmnet', 'getOrder', "getWishlist", 'getDiamond', "deleteWhishlist", "getProfile", "addAddress", "getAddress", "editAddress", "deleteAddress", "editProfile", "addCart", "getTocart", "deleteCart", "editCart", "addCreateOrder", "getMetal"];


      if (token && protectedEndpoints.includes(endpoint)) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Login
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "/login/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"], // ✅ Auto refetch categories
    }),
    Forgotpassword: builder.mutation({
      query: (formData) => ({
        url: "/forgot-password/",
        method: "PUT",
        body: formData,
      }),

    }),

    signUpUser: builder.mutation({
      query: (formData) => ({
        url: "/register/",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access) {
            dispatch(setToken(data.access)); // ✅ Store token using action
            localStorage.setItem("aprifrontoken", data.access); // ✅ Store in localStorage
          }

        } catch (error) {

        }
      },
    }),

    // get Profile
    getProfile: builder.query({
      query: () => "profile/",
      providesTags: ["Profile"],
    }),


    editProfile: builder.mutation({
      query: (formData) => ({
        url: "update-profile/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),


    // ✅ Fetch Categories
    getCategories: builder.query({
      query: (keyword) => {
        const url = keyword ? `view-categories/?category_type=${keyword}` : "view-categories/";
        return url;
      },
      providesTags: ["Category"],
    }),



    // Sub Category
    getSubCategories: builder.query({
      query: (category_id) => {
        const url = category_id ? `view-subcategories/?category_id=${category_id} ` : "view-subcategories";
        return url;
      },

      providesTags: ["Subcategory"],
    }),

    getTrending: builder.query({
      query: () => `view-products/?filter_type=trending&filter_data=trending`,
      providesTags: ["Trending"],
    }),


    // getAllProduct: builder.query({
    //   query: () => "view-products/?filter_type=bestseller&filter_data=bestseller",
    //   providesTags: ["Product"],
    // }),
    getAllProduct: builder.query({
      query: ({ category_id, subcategory_id, filter_data, filter_type, sort_order, categoryName, page_size, page, category_type,fetch_all,search } = {}) => {
        let params = [];

        if (category_id) params.push(`category_id=${category_id}`);
        if (subcategory_id) params.push(`subcategory_id=${subcategory_id}`);
        if (filter_data) params.push(`filter_data=${filter_data}`);
        if (filter_type) params.push(`filter_type=${filter_type}`);
        if (sort_order) params.push(`sort_order=${sort_order}`);
        if (categoryName) params.push(`category_type=${categoryName}`);
        if (page_size) params.push(`page_size=${page_size}`);
        if (page) params.push(`page=${page}`);
        if (category_type) params.push(`category_type=${category_type}`);
        if (fetch_all) params.push(`fetch_all=${fetch_all}`);
        if (search) params.push(`search_query=${search}`);

        const queryString = params.length ? `?${params.join("&")}` : "";
        return `view-products/${queryString}`;
      },
      providesTags: ["Product"],
    }),


    getProductData: builder.query({
      query: () => "view-products/",
      providesTags: ["ProductData"],
    }),

    getProduct: builder.query({
      query: (keyword) => {
        const url = keyword ? `view-products/?category_type=${keyword}` : "view-products/";
        return url;
      },
      providesTags: ["Product"],
    }),

    getProductid: builder.query({
      query: (keyword) => {
        const url = keyword ? `view-products/?product_id=${keyword}` : "view-products/";
        return url;
      },
      providesTags: ["Product"],
    }),

    addAddress: builder.mutation({
      query: (formData) => ({
        url: "add-address/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Address"],
    }),

    getAddress: builder.query({
      query: () => "view-addresses/",
      providesTags: ["Address"],
    }),

    editAddress: builder.mutation({
      query: (formData) => ({
        url: "update-address/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Address"],
    }),


    deleteAddress: builder.mutation({
      query: (formData) => ({
        url: `delete-address`, // Use the address_id from FormData
        method: "DELETE",
        body: formData
      }),
      invalidatesTags: ["Address"],
    }),


    // Wishlist

    addwhishlist: builder.mutation({
      query: (formData) => ({
        url: "add-wishlist/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product", "Wishlist"], // ✅ Auto refetch categories
    }),

    getWishlist: builder.query({
      query: () => {
        const url = "view-wishlist/";
        return url;
      },
      providesTags: ["Wishlist"],
    }),

    deleteWhishlist: builder.mutation({
      query: (formdata) => {

        return {
          url: "delete-wishlist/",
          method: "DELETE",
          body: formdata,
        };
      },
      invalidatesTags: ["Wishlist"],
    }),

    addCart: builder.mutation({
      query: (formData) => ({
        url: "add-cart/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product", "Wishlist", 'cart'], // ✅ Auto refetch categories
    }),

    getTocart: builder.query({
      query: () => {
        const url = "view-cart/";
        return url;
      },
      providesTags: ["cart"],
    }),

    deleteCart: builder.mutation({
      query: (formdata) => {

        return {
          url: `delete-cart/`,
          method: "DELETE",
          body: formdata,
        };
      },
      invalidatesTags: ["cart"],
    }),



    editCart: builder.mutation({
      query: (formData) => ({
        url: "update-cart/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["cart"], // ✅ Auto refetch categories
    }),

    addCreateOrder: builder.mutation({
      query: (formData) => ({
        url: "create-order/",
        method: "POST",
        body: formData,
      }), // ✅ Auto refetch categories
    }),

    getMetal: builder.query({
      query: () => {
        const url = "view-metal/";
        return url;
      },
      providesTags: ["Metal"],
    }),

    getDiamond: builder.query({
      query: () => {
        const url = "view-diamonds/";
        return url;
      },
      providesTags: ["Diamond"],
    }),

    getOrder: builder.query({
      query: (user) => {
        const url = `view-order/?username=${user}&status=success`;
        return url;
      },
      providesTags: ["Order"],
    }),

    addAppoinmnet: builder.mutation({
      query: (formData) => ({
        url: "add-appointment/",
        method: "POST",
        body: formData,
      }), // ✅ Auto refetch categories
      invalidatesTags: ["Appoinment"], // ✅ Auto refetch categories
    }),
    getAppoinment: builder.query({
      query: () => {
        const url = `view-appointments/`;
        return url;
      },
      providesTags: ["Appoinment"],
    }),


  }),
});

// Export hooks for components
export const {
  useLoginUserMutation,
  useForgotpasswordMutation,
  useSignUpUserMutation,  // ✅ Ensure this is exported
  useGetProfileQuery,
  useEditProfileMutation,

  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetTrendingQuery,
  useGetAllProductQuery,
  useGetProductQuery,
  useGetProductDataQuery,
  useGetProductidQuery,
  useAddAddressMutation,
  useGetAddressQuery,
  useEditAddressMutation,
  useDeleteAddressMutation,

  useAddwhishlistMutation,
  useGetWishlistQuery,
  useDeleteWhishlistMutation,

  useAddCartMutation,
  useGetTocartQuery,
  useDeleteCartMutation,
  useEditCartMutation,
  useAddCreateOrderMutation,
  useGetMetalQuery,
  useGetDiamondQuery,
  useGetOrderQuery,
  useGetAllCateProductQuery,
  useLazyGetTrendingQuery,
  useLazyGetAllProductQuery,
  useLazyGetProductDataQuery,
  useGetAppoinmentQuery,
  useAddAppoinmnetMutation,
  useLazyGetProductidQuery,

} = apiSlice;
