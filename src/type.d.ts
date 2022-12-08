interface ITournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
}

type ResetData = {
  idx: number;
  data: ITournament;
};
type TournamentState = {
  tournaments: ITournament[];
  loading: boolean;
  serverErr: boolean;
  filterWord: string;
};

type TournamentAction = {
  type: string;
  payload: any;
};

type DispatchType = (args: TournamentAction) => TournamentAction;
