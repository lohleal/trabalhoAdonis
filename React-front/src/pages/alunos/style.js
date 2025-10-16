import styled from 'styled-components';
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Merriweather&display=swap" rel="stylesheet" />


export const Input = styled.input`
  display: inline-block;
  width: 100%;
  height: 30px;
  border: 0px;
  border-left: 1px solid #888;
  border-bottom: 1px solid #888;
  border-radius: 3px;
  margin-bottom: 10px;
  padding-left: 10px;

  &:focus {
    outline: none;
    border: 1px solid #555;
    border-radius: 4px;
  }
`;

export const Select = styled.select`
  display: inline-block;
  width: 90%;
  height: 30px;
  border: 0px;
  border-left: 1px solid #888;
  border-bottom: 1px solid #888;
  border-radius: 3px;
  margin-bottom: 10px;
  padding-left: 10px;

  &:focus {
    outline: none;
    border: 1px solid #555;
    border-radius: 4px;
  }
`;


export const Submit = styled.input.attrs({ type: 'submit' })`
  box-sizing: border-box;
  width: 180px;
  height: 35px;
  background-color: #4D0F0F;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 20px;
  border: 0px;
  cursor: grab;
  margin-right: 5px;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 20px; /* espaço entre os campos */
  margin-top: 15px;
`;

export const LabelEndereco = styled.label`
  display: block;
  font-size: 21px;
  color: #4D0F0F;
  margin-top: 15px;
  margin-bottom: 5px;
  font-family: 'Merriweather', serif;

  font-weight: bold; /* Negrito */
  `;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;