import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartItems: [],
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    // updateCart: (state, action) => {
    //   state.cartItems = state.cartItems.map((item) =>
    //     item.id === action.payload.id
    //       ? { ...item, quantity: action.payload.quantity }
    //       : item
    //   );
    // },

    updateCart: (state, action) => {
      console.log(action.payload.id); // Imprime el ID del payload
      state.cartItems = state.cartItems.map((item) => {
        console.log(item.id); // Imprime el ID de cada ítem en el carrito
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
  },
});

export const {
  addToCart,
  deleteFromCart,
  updateCart,
  showLoading,
  hideLoading,
} = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
