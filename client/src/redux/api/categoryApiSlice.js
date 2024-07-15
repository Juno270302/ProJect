import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../contacts";

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data._id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
