"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPayment: 0,
  value: 0,
  items: [
    {
      id: 1,
      name: "Blue denim shirt",
      typeData: "SHORT BLUE - BLUE",
      color: "COLOR BLUE",
      size: "XL",
      body: "Selamat User ID kamu berhasil tersimpan.",
      imageUrl: "/baju2.jpeg",
      price: 17.0,
      count: 1,
    },
    {
      id: 2,
      name: "Red hoodie",
      typeData: "HOODIE - RED",
      color: "COLOR RED",
      size: "M",
      body: "Selamat User ID kamu berhasil tersimpan.",
      imageUrl: "/baju2.jpeg",
      price: 35.0,
      count: 1,
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.items[action.payload].count += 1;
    },
    decrement: (state, action) => {
      state.items[action.payload].count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    removeItem: (state, action) => {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      console.log(updatedItems);

      state.items = updatedItems;
    },

    totalAmount: (state) => {
      state.totalPayment = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price;
      }, 0);

      // state.items.forEach((element) => {
      //   state.totalPayment += element.price;
      // });
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  totalAmount,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
