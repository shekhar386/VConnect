import {createSlice} from '@reduxjs/toolkit';

export const userData = createSlice({
    name: 'User',
    initialState: {
        userData: [],
    },
    reducers: {
        storeUser: (state, action) => {
            state.userData = action.payload;
            //console.log(state);
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeUser } = userData.actions;

export const dataValue = state => state.userData;

export default userData.reducer;
