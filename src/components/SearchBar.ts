import styled from 'styled-components';
import theme from '../theme';

const SearchBar = styled.div`
  ${theme.typography.body};
  margin: 0;
  margin-bottom: ${theme.spacing(4)};
  display: flex;
  justify-content: space-between;
`;

export default SearchBar;
