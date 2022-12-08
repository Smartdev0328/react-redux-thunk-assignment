import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TournamentState = {
  tournaments: [],
  loading: true,
  serverErr: false,
  filterWord: '',
};

const tournamentSlice = createSlice({
  name: 'Tournament',
  initialState: initialState,
  reducers: {
    setTournaments(state, action: PayloadAction<ITournament[]>) {
      state.tournaments = action.payload;
    },
    setTournamentData(state, action: PayloadAction<ResetData>) {
      state.tournaments[action.payload.idx] = action.payload.data;
    },
    removeTournamentData(state, action: PayloadAction<number>) {
      state.tournaments.splice(action.payload, 1);
    },
    addTournamentData(state, action: PayloadAction<ITournament>) {
      state.tournaments.unshift(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setErr(state, action: PayloadAction<boolean>) {
      state.serverErr = action.payload;
    },
    setFilterWord(state, action: PayloadAction<string>) {
      state.filterWord = action.payload;
    },
  },
});

export const {
  setTournaments,
  setLoading,
  setErr,
  setTournamentData,
  removeTournamentData,
  setFilterWord,
  addTournamentData,
} = tournamentSlice.actions;
export const tournaments = tournamentSlice.reducer;
