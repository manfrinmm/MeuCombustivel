import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Text } from "react-native";
import Input from "../../components/form/Input";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Button,
  ButtonText,
  Container,
  FuelContainer,
  FuelInputs,
  FuelResultCost,
  FuelResultType,
  FuelType,
  ResultContainer,
} from "./styles";
import { useEffect } from "react";

interface FuelData {
  type: string;
  cost: string;
}

function currencyFormat(num: number) {
  return "R$ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default function Home() {
  const formRef = useRef<FormHandles>(null);
  const [fuel, setFuel] = useState<FuelData>();

  useEffect(() => {
    async function loadMetrics() {
      const jsonValue = await AsyncStorage.getItem("@MeuCombustivel:metrics");

      if (jsonValue) {
        console.log({ jsonValue });

        formRef.current?.setData(JSON.parse(jsonValue));
      }
    }

    loadMetrics();
  }, []);

  const handleSubmit = useCallback(async ({ etanol, gasolina }) => {
    console.log({ etanol, gasolina });

    const jsonValue = JSON.stringify({ etanol, gasolina });

    await AsyncStorage.setItem("@MeuCombustivel:metrics", jsonValue);

    const etanolCustoPorKm = Number(etanol.custo) / Number(etanol.consumo);
    const gasolinaCustoPorKm =
      Number(gasolina.custo) / Number(gasolina.consumo);

    if (etanolCustoPorKm <= gasolinaCustoPorKm) {
      setFuel({
        type: "Etanol",
        cost: currencyFormat(etanolCustoPorKm),
      });
    } else {
      setFuel({
        type: "Gasolina",
        cost: currencyFormat(gasolinaCustoPorKm),
      });
    }
  }, []);

  return (
    <Container>
      {fuel && (
        <ResultContainer>
          <Text style={{ fontSize: 18 }}>Escolha por</Text>
          <FuelResultType>{fuel.type}</FuelResultType>
          <FuelResultCost>{fuel.cost}/km</FuelResultCost>
        </ResultContainer>
      )}
      <Form
        onSubmit={handleSubmit}
        ref={formRef}
        // initialData={{
        //   etanol: { consumo: "6.5", custo: "4.32" },
        //   gasolina: { consumo: "10", custo: "6.32" },
        // }}
      >
        <FuelContainer>
          <FuelType>Etanol</FuelType>

          <FuelInputs>
            <Scope path="etanol">
              <Input
                label="Consumo médio"
                name="consumo"
                placeholder="Digite o consumo"
              />
              <Input
                label="Custo"
                name="custo"
                placeholder="Digite o custo"
                containerStyle={{ marginLeft: 16 }}
              />
            </Scope>
          </FuelInputs>
        </FuelContainer>

        <FuelContainer style={{ marginTop: 24 }}>
          <FuelType>Gasolina</FuelType>

          <FuelInputs>
            <Scope path="gasolina">
              <Input
                label="Consumo médio"
                name="consumo"
                placeholder="Digite o consumo"
              />
              <Input
                label="Custo"
                name="custo"
                placeholder="Digite o custo"
                containerStyle={{ marginLeft: 16 }}
              />
            </Scope>
          </FuelInputs>
        </FuelContainer>

        <Button onPress={() => formRef.current?.submitForm()}>
          <ButtonText>Calcular</ButtonText>
        </Button>
      </Form>
    </Container>
  );
}
