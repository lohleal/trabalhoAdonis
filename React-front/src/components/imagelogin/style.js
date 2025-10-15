import styled from 'styled-components';
import logoLomi from '../../images/logoLomi.png';  // ✅ Import correto

export const Container = styled.div`
  background-image: url(${logoLomi});  // ✅ Logo atualizada
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-left: 1px solid #CCC;

  @media (max-width: 800px) {
    display: none;
  }
`;
