import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const initialState = {
  data: [],
  sortOrder: "asc",
  searchQueries: {
    text: "",
    link: "",
  },
  filteredData: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    sortData: (state, action) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";

      const sortedData = [...state.data].sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return state.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
      state.data = sortedData;
    },
    searchByColumn: (state, action) => {
      const { inputVal, colKey } = action.payload;
      state.searchQueries[colKey] = inputVal;

      state.filteredData = state.data.filter((item) => {
        const textMatch =
          !state.searchQueries.text ||
          (item.text &&
            item.text
              .toString()
              .toLowerCase()
              .includes(state.searchQueries.text.toLowerCase()));

        const linkMatch =
          !state.searchQueries.link ||
          (item.link &&
            item.link
              .toString()
              .toLowerCase()
              .includes(state.searchQueries.link.toLowerCase()));

        return textMatch && linkMatch;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getAllTableData.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
      }
    );
  },
});

export const { sortData, searchByColumn } = tableSlice.actions;
export default tableSlice.reducer;
