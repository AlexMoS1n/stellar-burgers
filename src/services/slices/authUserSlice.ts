import { TLoginData, TRegisterData, forgotPasswordApi, getUserApi, loginUserApi, logoutApi, registerUserApi, resetPasswordApi, updateUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { getCookie, setCookie } from "src/utils/cookie";

export const fetchGetUser = createAsyncThunk('authUser/fetchGetUser', async => getUserApi());

export const checkUserAuth = createAsyncThunk(
    'authUser/checkUser',
    (_, { dispatch }) => {
      if (getCookie('accessToken')) {
        dispatch(fetchGetUser()).finally(() => {
          dispatch(authChecked()); 
        });
      } else {
        dispatch(authChecked());
      }
    }
  ); 

export const fetchLoginUser = createAsyncThunk(
    'authUser/fetchLoginUser',
    async (loginData:TLoginData,{rejectWithValue})=> {
        const data = await loginUserApi(loginData);
        if (!data?.success) {
            return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
    }
);

export const fetchRegisterUser=createAsyncThunk(
    'authUser/fetchRegisterUser',
    async(registerData: TRegisterData, {rejectWithValue}) => {
        const data = await registerUserApi(registerData);
        if (!data?.success) {
            return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
}
);

export const fetchUpdateUser = createAsyncThunk(
    'authUser/fetchUpdateUser',
    async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const fetchForgotPassword = createAsyncThunk(
    'authUser/fetchForgotPassword',
    async (data: { email: string }) => forgotPasswordApi(data)
);

export const fetchResetPassword =createAsyncThunk(
    'authUser/fetchResetPassword',
    async (data: { password: string; token: string } ) => resetPasswordApi(data)
);


export const fetchLogoutUser = createAsyncThunk('authUser/fetchLogoutUser',
   async () => logoutApi()
);

interface IAuthUser {
userData: TUser|null;
isAuthChecked: boolean;
loginUserRequest: boolean;
errorRegistration: string|null;
errorLogin: string|null;
errorUpdate: string|null;
};

const initialState:IAuthUser = {
    userData: null,
    isAuthChecked: false,
    loginUserRequest: false,
    errorRegistration: null,
    errorLogin: null,
    errorUpdate: null
}

const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        authChecked:(state) => {
            state.isAuthChecked = true;
        }
    },
    selectors: {
        getUserData: (state) => state.userData,
        getAuthChecked: (state) => state.isAuthChecked,
        getLoginUserRequest: (state) => state.loginUserRequest,
        getErrorRegistration: (state) => state.errorRegistration,
        getErrorLogin: (state) => state.errorLogin,
        getUpdateError: (state) => state.errorUpdate
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginUser.pending, (state)=>{
                state.loginUserRequest = true;
            })
            .addCase(fetchLoginUser.fulfilled, (state, action) => {
                state.userData=action.payload;
                state.isAuthChecked = true;
                state.loginUserRequest = false;
                state.errorLogin=null
            })
            .addCase(fetchLoginUser.rejected, (state, action) => {
                state.isAuthChecked=true;
                state.errorLogin='Ошибка в получении доступа к личному кабинету';
            }
        )

    }
});

export const {authChecked} = authUserSlice.actions