import { getAllProducts } from "./MainAPI";
export function getallproduct(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {        
        state.products = action.payload;
    });
}