// import styled from 'styled-components';
// import logoLomi from '../../images/logoLomi.png';  // ✅ Import correto

// export const Container = styled.div`
//   background-image: url(${logoLomi});  // ✅ Logo atualizada
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
//   border-left: 1px solid #CCC;

//   @media (max-width: 800px) {
//     display: none;
//   }
// `;


import styled from 'styled-components';


export const Container = styled.div`
  background-color: #4D0F0F; // Cor de fundo
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Para garantir que o conteúdo ocupe toda a tela
  color: white; // Cor do texto
  font-size: 6rem; // Tamanho do texto
  font-family: 'Playfair Display', serif; // Fonte elegante
  font-weight: bold;
  text-transform: uppercase;

  @media (max-width: 800px) {
    display: none;
  }
`;
