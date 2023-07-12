import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserState {
  userData: any;
}

const initialState: UserState = {
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    UPDATE_USER: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
  },
});

export const {UPDATE_USER} = userSlice.actions;
export default userSlice.reducer;
