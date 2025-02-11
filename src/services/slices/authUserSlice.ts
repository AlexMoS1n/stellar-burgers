import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const fetchGetUser = createAsyncThunk('authUser/fetchGetUser', (async) =>
  getUserApi()
);

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
  async (loginData: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi(loginData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'authUser/fetchRegisterUser',
  async (registerData: TRegisterData, { rejectWithValue }) => {
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

export const fetchLogoutUser = createAsyncThunk(
  'authUser/fetchLogoutUser',
  async () => logoutApi()
);

export const fetchForgotPassword = createAsyncThunk(
  'authUser/fetchForgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const fetchResetPassword = createAsyncThunk(
  'authUser/fetchResetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

interface IAuthUser {
  userData: TUser | null;
  isAuthChecked: boolean;
  loginUserRequest: boolean;
  errorRegistration: string | null;
  errorLogin: string | null;
  errorUpdate: string | null;
  errorLogout: string | null;
}

export const initialState: IAuthUser = {
  userData: null,
  isAuthChecked: false,
  loginUserRequest: false,
  errorRegistration: null,
  errorLogin: null,
  errorUpdate: null,
  errorLogout: null
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUserData: (state) => state.userData,
    getAuthChecked: (state) => state.isAuthChecked,
    getLoginUserRequest: (state) => state.loginUserRequest,
    getErrorRegistration: (state) => state.errorRegistration,
    getErrorLogin: (state) => state.errorLogin,
    getErrorUpdate: (state) => state.errorUpdate
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.errorLogin = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
        state.errorLogin = null;
      })
      .addCase(fetchLoginUser.rejected, (state) => {
        state.isAuthChecked = false;
        state.errorLogin = 'Ошибка в получении доступа к личному кабинету';
        state.loginUserRequest = false;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loginUserRequest = true;
        state.errorRegistration = null;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(fetchRegisterUser.rejected, (state) => {
        state.errorRegistration = 'Ошибка в регистристрации пользователя';
        state.loginUserRequest = false;
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.loginUserRequest = true;
        state.errorLogout = null;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.loginUserRequest = false;
        state.userData = null;
        localStorage.clear();
        deleteCookie('accessToken');
      })
      .addCase(fetchLogoutUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.errorLogout = 'Ошибка выхода из аккаунта пользователя';
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loginUserRequest = true;
        state.userData = null;
        state.errorUpdate = null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.userData = action.payload.user;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.errorUpdate = 'Ошибка в обновлении данных пользователя';
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.errorLogin = null;
        state.errorRegistration = null;
        state.errorLogout = null;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      });
  }
});

export const authUserReducer = authUserSlice.reducer;
export const {
  getUserData,
  getAuthChecked,
  getLoginUserRequest,
  getErrorRegistration,
  getErrorLogin,
  getErrorUpdate
} = authUserSlice.selectors;
export const { authChecked } = authUserSlice.actions;
export const authUserSliceName = authUserSlice.name;
