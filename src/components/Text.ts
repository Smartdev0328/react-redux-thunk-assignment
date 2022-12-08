import styled from 'styled-components';
import theme from '../theme';

const Text = styled.div`
  ${theme.typography.body};
  margin: 0;
  margin-bottom: ${theme.spacing(2)};
`;

export default Text;
