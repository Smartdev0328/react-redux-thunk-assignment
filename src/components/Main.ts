import styled from 'styled-components';
import theme from '../theme';

const Main = styled.div`
  max-width: 960px;
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-start;
`;

export default Main;
