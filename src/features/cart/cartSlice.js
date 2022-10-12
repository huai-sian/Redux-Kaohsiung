import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from '../modal/modalSlice';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: false,
  tourData: [],
  filterData: [],
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getTourData = createAsyncThunk(
  'cart/getTourData',
  async (selected, thunkAPI) => {
    try {
      const res = await axios('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json');
      console.log(res.data.result.records);
      const temp = res.data.result.records;

      return { data: temp, selected };
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
    [getTourData.pending]: (state) => {
      state.isLoading = true;
    },
    [getTourData.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.tourData = action.payload.data;
      let newData = [];
      let items = action.payload.selected === '' ? action.payload.data : action.payload.data.filter(item => item.Zone === action.payload.selected);
      items.forEach((item, i) => {
        if(i % 10 === 0) {
          newData.push([])
        }
        const page = parseInt(i / 10)
        newData[page].push(item)
      })
      state.filterData = newData;
    },
    [getTourData.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
