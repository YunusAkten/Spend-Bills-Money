import { createSlice } from "@reduxjs/toolkit";
import products from "../products.json";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    products: products.items,
    cart: [],
    money: 100000000000,
  },
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },

    addToCart: (state, { payload }) => {
      const { product, count } = payload;
      const findProduct = state.cart.find(
        (item) => item.product.id === product.id
      );
      // if product is already in cart
      if (findProduct) {
        // if count is not a number
        if (isNaN(count)) {
          state.money =
            state.money + findProduct.product.productPrice * findProduct.count;
          state.cart = state.cart.filter(
            (item) => item.product.id !== product.id
          );
          return;
        }
        // selling product
        else if (count < findProduct.count) {
          state.money =
            state.money +
            findProduct.product.productPrice * (findProduct.count - count);
          findProduct.count = count;
          if (count === 0) {
            state.cart = state.cart.filter(
              (item) => item.product.id !== product.id
            );
          }
        }
        // buying product
        else if (count > findProduct.count) {
          state.money =
            state.money -
            findProduct.product.productPrice * (count - findProduct.count);
          findProduct.count = count;
        }
      }
      // if product is not in cart
      else {
        state.cart.push({ product, count });
        state.money = state.money - product.productPrice * count;
      }
      if (count === 0) {
        state.cart = state.cart.filter(
          (item) => item.product.id !== product.id
        );
      }
    },
    sellOne: (state, { payload }) => {
      const { product } = payload;
      console.log(product);
      const findProduct = state.cart.find(
        (item) => item.product.id === product.id
      );

      state.money = state.money + findProduct.product.productPrice * 1;
      findProduct.count = findProduct.count - 1;
      if (findProduct.count === 0) {
        state.cart = state.cart.filter(
          (item) => item.product.id !== product.id
        );
      }
    },
    buyOne: (state, { payload }) => {
      const { product } = payload;
      const findProduct = state.cart.find(
        (item) => item.product.id === product.id
      );
      if (!findProduct) {
        state.cart.push({ product, count: 1 });
        state.money = state.money - product.productPrice * 1;
        return;
      } else if (state.money < findProduct.product.productPrice * 1) return;

      state.money = state.money - findProduct.product.productPrice * 1;
      findProduct.count = findProduct.count + 1;
    },
  },
});
export const { setProducts, formatNumber, addToCart, sellOne, buyOne } =
  appSlice.actions;
