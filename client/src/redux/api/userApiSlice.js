import { apiSlice } from "./apiSlice";
import { UPLOAD_URL, USERS_URL } from "../contacts";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    profile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    updateAddress: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/address`,
        method: "PUT",
        body: data,
      }),
    }),

    getAllUser: builder.query({
      query: (data) => ({
        url: `${USERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    deleteUserById: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data._id}`,
        method: "DELETE",
      }),
    }),

    deleteUserByCheck: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useUpdateAddressMutation,
  useGetAllUserQuery,
  useUploadProductImageMutation,
  useDeleteUserByIdMutation,
  useDeleteUserByCheckMutation,
} = userApiSlice;
