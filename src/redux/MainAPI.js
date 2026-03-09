import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../helper/AxiosInstance";

export const getAllProducts = createAsyncThunk(// trả ra 1 action name 
    "product/getAllProducts", 
    async (data, { rejectWithValue }) => {
        try {
            //http://192.168.1.202:8080/
            const response = await AxiosInstance().get(`/products/getallproduct`);
            const result = response.data;
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);