import { RootState } from '../reducers';
import axios from 'axios';
import { AppThunk } from '../store';
import {
  setLoading,
  setErr,
  setTournaments,
  setTournamentData,
  removeTournamentData,
  setFilterWord,
  addTournamentData,
} from '../reducers/tournaments';

export const getTournamentData =
  (filterWord: string): AppThunk =>
  async (dispatch) => {
    await dispatch(setLoading(true));
    axios
      .get(`http://localhost:4000/tournaments?q=${filterWord}`)
      .then(({ data }) => {
        console.log(data);
        dispatch(setTournaments(data));
        setFilterWord(filterWord), dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setErr(true));
      });
  };

export const editTournamentData =
  (idx: number, id: string, name: string): AppThunk =>
  async (dispatch) => {
    axios
      .patch(`http://localhost:4000/tournaments/${id}`, { name: name })
      .then(({ data }) => {
        console.log(data);
        dispatch(setTournamentData({ idx, data }));
      })
      .catch((err) => {
        dispatch(setErr(true));
      });
  };

export const deleteTournamentData =
  (idx: number, id: string): AppThunk =>
  async (dispatch) => {
    axios
      .delete(`http://localhost:4000/tournaments/${id}`)
      .then(() => {
        dispatch(removeTournamentData(idx));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setErr(true));
      });
  };

export const insertTournamentData =
  (name: string): AppThunk =>
  async (dispatch) => {
    axios
      .post(`http://localhost:4000/tournaments`, { name: name })
      .then(({ data }) => {
        dispatch(addTournamentData(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setErr(true));
      });
  };
