import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/Container';
import H4 from './components/H4';
import H6 from './components/H6';
import Text from './components/Text';
import Center from './components/Center';
import SearchBar from './components/SearchBar';
import Input from './components/Input';
import Button from './components/Button';
import Card from './components/Card';
import Main from './components/Main';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  getTournamentData,
  editTournamentData,
  deleteTournamentData,
  insertTournamentData,
} from './actions/tournaments';
import { useTypedSelector } from './selectors/tournaments';
import { RootState } from './reducers';

const App = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [filterWord, setFilterWord] = useState<string>('');
  const data = useTypedSelector((state: RootState) => state.tournaments);
  const dispatch: Dispatch<any> = useDispatch();

  const getData = useCallback(
    async (filterWord: string) => dispatch(getTournamentData(filterWord)),
    [dispatch]
  );

  const editData = useCallback(
    async (idx: number, id: string, name: string) =>
      dispatch(editTournamentData(idx, id, name)),
    [dispatch]
  );

  const deleteData = useCallback(
    async (idx: number, id: string) => dispatch(deleteTournamentData(idx, id)),
    [dispatch]
  );

  const insertData = useCallback(
    async (name: string) => dispatch(insertTournamentData(name)),
    [dispatch]
  );

  useEffect(() => {
    getData('');
  }, []);

  const handleEdit = (id: string, idx: number) => {
    let name: string | null = prompt('New Tournament Name:', data.tournaments[idx].name);
    var regEx = /^[a-z][a-z\s]*$/;
    while (name != null && !name?.match(regEx)) {
      name = prompt('New Tournament Name:');
    }
    if (name === null) return;
    else editData(idx, id, name);
  };

  const handleDelete = (id: string, idx: number) => {
    let isDelete = confirm('Do you really want to delete this tournament?');
    if (isDelete) deleteData(idx, id);
    else return;
  };

  const handleRetry = () => {
    getData(filterWord);
  };

  const handleChange = (e: any) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setFilterWord(e.target.value);
        getData(e.target.value);
      }, 500)
    );
  };

  const handleCreate = () => {
    let name: string | null = prompt('New Tournament Name:');
    var regEx = /^[a-z][a-z\s]*$/;
    while (name != null && !name?.match(regEx)) {
      name = prompt('Tournament Name:');
    }
    if (name === null) return;
    else insertData(name);
  };

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <SearchBar>
        <Input placeholder="Search Tournament" onChange={handleChange}></Input>
        <Button onClick={handleCreate}>CREATE TOURNAMENT</Button>
      </SearchBar>
      {data.loading ? (
        <Center>Loading tournaments...</Center>
      ) : data.serverErr ? (
        <Center>
          <Text>Something went wrong.</Text>
          <Button onClick={handleRetry}>RETRY</Button>
        </Center>
      ) : (
        <Main>
          {data.tournaments.map((item,idx) => (
            <Card key={item.id}>
              <H6>{item.name}</H6>
              <Text>Organizer:{item.organizer}</Text>
              <Text>Game:{item.game}</Text>
              <Text>
                Participants:{item.participants.max}.{item.participants.current}
              </Text>
              <Text>Start:{item.startDate}</Text>
              <Button onClick={() => handleEdit(item.id, idx)}>EDIT</Button>
              <Button onClick={() => handleDelete(item.id, idx)}>DELETE</Button>
            </Card>
          ))}
        </Main>
      )}
    </Container>
  );
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
