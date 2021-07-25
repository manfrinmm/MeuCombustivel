import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;

  /* align-items: center; */

  max-width: 360px;
`;

export const ResultContainer = styled.View`
  align-items: center;

  margin: 32px;
`;

export const FuelResultType = styled.Text`
  font-size: 54px;
`;

export const FuelResultCost = styled.Text`
  font-size: 32px;
`;

export const FuelContainer = styled.View`
  align-items: center;
  /* width: 100%; */
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid;
`;

export const FuelType = styled.Text`
  font-size: 32px;
  text-align: center;
  /* margin-bottom: 16px; */
`;

export const FuelInputs = styled.View`
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  margin-top: 32px;

  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  text-align: center;
`;
