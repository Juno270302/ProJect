import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../contacts";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProduct: builder.query({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),

    deleteProductById: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}`,
        method: "DELETE",
      }),
    }),

    deleteProductByCheck: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "DELETE",
        body: data,
      }),
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    fetchProductById: builder.query({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchProductQuery,
  useDeleteProductByIdMutation,
  useDeleteProductByCheckMutation,
  useCreateProductMutation,
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} = productApiSlice;
