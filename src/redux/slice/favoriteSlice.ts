import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FavoriteItem} from '../../types';

export interface FavoriteState {
  favoriteData: FavoriteItem[];
}

const initialState: FavoriteState = {
  favoriteData: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    ADD_FAVORITE: (state, action: PayloadAction<FavoriteItem>) => {
      const {favoriteData} = state;
      const {payload} = action;
      const index = favoriteData.findIndex(item => item.slug === payload.slug);
      if (index === -1) {
        favoriteData.unshift(payload);
      }
      state.favoriteData = favoriteData;
    },
    REMOVE_FAVORITE: (state, action: PayloadAction<string | any>) => {
      const {favoriteData} = state;
      const {payload} = action;
      const newFavorite = favoriteData.filter(
        item => item.slug !== payload.slug,
      );
      state.favoriteData = newFavorite;
    },
    SET_INITIAL_FAVORITE: (state, action: PayloadAction<FavoriteItem[]>) => {
      state.favoriteData = action.payload;
    },
    REMOVE_ALL_FAVORITE: state => {
      state.favoriteData = [];
    },
  },
});

export const {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_INITIAL_FAVORITE,
  REMOVE_ALL_FAVORITE,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
