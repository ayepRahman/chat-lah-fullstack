import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, Text, useToast } from "@chakra-ui/react";
import { validationSchema } from "./validations";
import { FieldNames } from "./enums";
import { LOGIN } from "./gql";
import { FormData, LoginData, LoginVar } from "./interfaces";
import { useHistory } from "react-router-dom";
import { LocalStorage } from "enums/LocalStorage";
import { Routes } from "enums/Routes";

const LoginForm: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [login, { loading }] = useMutation<LoginData, LoginVar>(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem(LocalStorage.X_TOKEN, data.login.accessToken);
      history.push(Routes.HOME);
    },
    onError: ({ message }) => {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    },
  });

  const onSubmit = (values: any) => {
    login({
      variables: {
        input: {
          email: values[FieldNames.EMAIL],
          password: values[FieldNames.PASSWORD],
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        isInvalid={!!errors[FieldNames.EMAIL]}
        placeholder="email"
        focusBorderColor="purple.500"
        {...register(FieldNames.EMAIL)}
      />
      {!!errors?.[FieldNames.EMAIL] && (
        <Text mt="0.25rem" fontSize="xs" color="red">
          {errors[FieldNames.EMAIL]?.message}
        </Text>
      )}
      <Input
        isInvalid={!!errors[FieldNames.PASSWORD]}
        mt="1rem"
        type="password"
        placeholder="password"
        focusBorderColor="purple.500"
        {...register(FieldNames.PASSWORD)}
      />
      {!!errors?.[FieldNames.PASSWORD] && (
        <Text mt="0.25rem" fontSize="xs" color="red">
          {errors[FieldNames.PASSWORD]?.message}
        </Text>
      )}
      <Button
        isLoading={loading}
        mt="1rem"
        colorScheme="purple"
        isFullWidth
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
