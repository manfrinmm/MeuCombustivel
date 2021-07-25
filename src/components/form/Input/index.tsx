import { useField } from "@unform/core";
import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { Text, TextInputProps, ViewStyle } from "react-native";

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  containerStyle?: ViewStyle;
}

import { Container, TextInput } from "./styles";

function Input({
  name,
  label,
  onChangeText,
  containerStyle = {},
  ...rest
}: InputProps) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    inputRef.current.value = defaultValue || "";
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue || "";
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      // getValue() {
      //   if (inputRef.current) return inputRef.current.value;
      //   return "";
      // },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: "" });
          inputRef.current.value = "";
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    (text) => {
      if (inputRef.current) inputRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText],
  );

  return (
    <Container style={containerStyle}>
      <Text>{label}</Text>

      <TextInput
        ref={inputRef}
        keyboardType="decimal-pad"
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
}

//export default forwardRef(Input);
export default Input;
