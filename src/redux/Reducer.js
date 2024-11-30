import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Register, Login, ForgetPassword, VerifyOTP } from "./UserBuilder";
import { getallproduct } from "./MainBuilder";



const appSlice = createSlice({
    name: "app",
    initialState: {
        count: 1,
        cart: [], // {id, name, price, quantity, images}
        user: null, // chưa login
        products: [],
        feedelivery: 30000,
    },
    reducers: {
        addItemToCart: (state, action) => {
            const index = state.cart.findIndex((item) => item._id.toString() == action.payload._id.toString());
            if (index >= 0) {
                state.cart[index].quantity += action.payload.quantity;
            }else{
                state.cart.push(action.payload);
            }
        },
        removeItemFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item._id.toString() !== action.payload.toString());
        },
        increaseItemQuantity: (state, action) => {
            const index = state.cart.findIndex((item) => item._id.toString() === action.payload.toString());
            if (index >= 0) {
                state.cart[index].quantity++;
            }
        },
        decreaseItemQuantity: (state, action) => {
            const index = state.cart.findIndex((item) => item._id.toString() === action.payload.toString());
            if (index >= 0 && state.cart[index].quantity > 1) {
                state.cart[index].quantity--;
            }
        },
        clearCart: (state, action) => {
            state.cart = [];
        },
        increaseItemDetial: (state, action) => {
            state.count += 1;
        },
        decreaseItemDetial: (state, action) => {
            if (state.count > 1) { 
                state.count -= 1;
            }
        },
        logout: (state) => {
            state.user = null;
            state.initialRouteNameUser = 'Login';
        },
        
    },
    extraReducers: (builder) => {
        Login(builder);
        Register(builder);
        getallproduct(builder);
        VerifyOTP(builder);
    },
});

export const { addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, increaseItemDetial, decreaseItemDetial, clearCart, logout } = appSlice.actions;
export default appSlice.reducer;