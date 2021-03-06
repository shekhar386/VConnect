import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'User',
  initialState: {
    email: '',
    password:'',
    isLoggedIn: false
  },
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
      return state;
    },
    login: (state) => {
      state.isLoggedIn = true;
      return state;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      return state;
    }
  }
})

// Action creators are generated for each case reducer function
export const { addUser, login, logout } = user.actions;

export const loginValue = state => state.login.isLoggedIn;

export default user.reducer
