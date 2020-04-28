import { createSlice } from '@reduxjs/toolkit';
import { useCookies } from 'react-cookie'; 

const login = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false,
    userType: null,
    hasCookie: null
  },
  reducers: {
    loggingIn: (state) => {
      // if (hasCookie !== null) {
      //   if (getCookie('authToken') === ?) { 
      //     state.loggedIn = true;
      //   }
      // }
      state.loggedIn = true;
    },
    loggingOut: (state) => {
      state.loggedIn = false;
    },
    setUserTypeUser: (state) => {
      state.userType = 3;
    },
    setUserTypeAdmin: (state) => {
      state.userType = 2;
    },
    setUserTypeSuperAdmin: (state) => {
      state.userType = 1;
    },
    removeUserType: (state) => {
      state.userType = 3;
    },
  },
});

export const {
  loggingIn,
  loggingOut,
  setUserTypeUser,
  setUserTypeAdmin,
  setUserTypeSuperAdmin,
} = login.actions;

export const selectLoginStatus = state => state.login.loggedIn;

export default login.reducer;
