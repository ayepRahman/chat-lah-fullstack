import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, Text, useToast } from "@chakra-ui/react";
import { validationSchema } from "./validations";
import { FieldNames } from "./enums";
import { REGISTER } from "./gql";
import { FormData, RegisterData, RegisterVar } from "./interfaces";

const RegisterForm: React.FC<{ registerOnCompleted?: () => void }> = ({
  registerOnCompleted,
}) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [registerUser, { loading }] = useMutation<RegisterData, RegisterVar>(
    REGISTER,
    {
      onCompleted: () => {
        toast({
          title:
            "You have successfully created an account with us! Start using Chat Lah by logging in!",
          status: "success",
          position: "top",
          isClosable: true,
        });
        if (registerOnCompleted) registerOnCompleted();
      },
      onError: ({ message }) => {
        toast({
          title: message,
          status: "error",
          position: "top",
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = (values: any) => {
    registerUser({
      variables: {
        input: {
          username: values[FieldNames.USERNAME],
          email: values[FieldNames.EMAIL],
          password: values[FieldNames.PASSWORD],
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        isInvalid={!!errors[FieldNames.USERNAME]}
        placeholder="username"
        focusBorderColor="purple.500"
        {...register(FieldNames.USERNAME)}
      />
      {!!errors?.[FieldNames.USERNAME] && (
        <Text mt="0.25rem" fontSize="xs" color="red">
          {errors[FieldNames.USERNAME]?.message}
        </Text>
      )}
      <Input
        isInvalid={!!errors[FieldNames.EMAIL]}
        mt="1rem"
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
      <Input
        isInvalid={!!errors[FieldNames.CONFIRM_PASSWORD]}
        mt="1rem"
        type="password"
        placeholder="confirm password"
        focusBorderColor="purple.500"
        {...register(FieldNames.CONFIRM_PASSWORD)}
      />
      {!!errors?.[FieldNames.CONFIRM_PASSWORD] && (
        <Text mt="0.25rem" fontSize="xs" color="red">
          {errors[FieldNames.CONFIRM_PASSWORD]?.message}
        </Text>
      )}
      <Button
        isLoading={loading}
        mt="1rem"
        colorScheme="purple"
        isFullWidth
        type="submit"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
