import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {HistoryChapterItem, HistoryItem} from '../../types';

export interface HistoryState {
  historySeries: HistoryItem[];
  historyChapter: HistoryChapterItem[];
}

const initialState: HistoryState = {
  historySeries: [],
  historyChapter: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    UPDATE_HISTORY: (state, action: PayloadAction<HistoryItem>) => {
      const {historySeries} = state;
      const {payload} = action;
      const index = historySeries.findIndex(
        item => item.seriesSlug === payload.seriesSlug,
      );
      if (index === -1) {
        historySeries.unshift(payload);
      } else {
        historySeries.splice(index, 1);
        historySeries.unshift(payload);
      }
      state.historySeries = historySeries;

      const {historyChapter} = state;
      const indexChapter = historyChapter.findIndex(
        item => item.chapterSlug === payload.chapterSlug,
      );
      if (indexChapter === -1) {
        historyChapter.push({
          chapterNumber: payload.chapterNumber,
          chapterSlug: payload.chapterSlug,
        });
      } else {
        historyChapter.splice(indexChapter, 1);
        historyChapter.push({
          chapterNumber: payload.chapterNumber,
          chapterSlug: payload.chapterSlug,
        });
      }
      state.historyChapter = historyChapter;
    },
    REMOVE_ALL_HISTORY: state => {
      state.historySeries = [];
      state.historyChapter = [];
    },
  },
});

export const {UPDATE_HISTORY, REMOVE_ALL_HISTORY} = historySlice.actions;
export default historySlice.reducer;
