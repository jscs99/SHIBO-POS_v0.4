import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = { loading: false, cartItems: [] };

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }

    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item;
      });
    },
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },

    resetCart: (state) => {
      state.cartItems = []; // Reinicia cartItems a un array vacío },
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  updateCart,
  showLoading,
  hideLoading,
  resetCart,
} = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
