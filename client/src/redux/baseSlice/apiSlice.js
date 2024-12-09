import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Table", "TableRow"],
  endpoints: (builder) => ({
    getAllTableData: builder.query({
      query: () => "/operations",
      providesTags: ["Table"],
    }),
    getTableRowById: builder.query({
      query: (id) => `/operations/${id}`,
      providesTags: ["TableRow"],
    }),
  }),
});

export const { useGetAllTableDataQuery, useGetTableRowByIdQuery } = apiSlice;
