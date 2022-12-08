import styled from 'styled-components';
import theme from '../theme';

const Card = styled.div`
  background: ${theme.palette.background.base};
  padding: ${theme.spacing(2)};
  border: none;
  color: ${theme.palette.text.primary};
  width: 30%;
  margin: 5px;
`;

export default Card;
