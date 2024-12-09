import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../services/axiosBaseQuery";

export const authApiSlice = createApi({
  reducerPath: "apiAuth",
  baseQuery: axiosBaseQuery({ baseUrl: "/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    refresh: builder.query({
      query: () => ({ url: "tokens/refresh" }),
      providesTags: ["User"],
    }),
    signUp: builder.mutation({
      query: (body) => ({ url: "auth/signup", method: "POST", data: body }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (body) => ({ url: "auth/login", method: "POST", data: body }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({ url: "auth/logout", method: "POST" }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRefreshQuery,
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApiSlice;
