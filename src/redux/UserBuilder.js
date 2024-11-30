import { login, register, forgetPassword, verifyOTP } from "./UserAPI";
export function Login(builder) {
    builder.addCase(login.pending, (state) => {        
        console.log('>>>>>pending....')
    });
    builder.addCase(login.fulfilled, (state, action) => {       
        state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {        
        console.log('>>>Error>>>', action)
    });
}

export function VerifyOTP(builder) {
    builder.addCase(verifyOTP.pending, (state) => {        
        console.log('>>>>>pending....')
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {       
        console.log('>>>fulfilled');
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {        
        console.log('>>>Error>>>', action)
    });
}

export function ForgetPassword(builder) {
    builder.addCase(forgetPassword.pending, (state) => {        
        console.log('>>>>>pending....')
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {       
        console.log('>>>fulfilled');
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {        
        console.log('>>>Error>>>', action)
    });
}

export function Register(builder) {
    builder.addCase(register.pending, (state) => {       
        console.log('>>>>>pending....')
    });
    builder.addCase(register.fulfilled, (state, action) => {
        console.log('>>>fulfilled');
    });

    builder.addCase(register.rejected, (state, action) => {
        console.log('>>>Error>>>', action)
    });
}