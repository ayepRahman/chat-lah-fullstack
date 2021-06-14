import React from "react";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@chakra-ui/react";
import { StringParam, useQueryParam } from "use-query-params";
import { RiSendPlaneLine } from "react-icons/ri";
import { Input, ChannelAddMessageBox } from "./styled";
import { CHANNEL_ADD_MESSAGE } from "./gql";
import { useForm } from "react-hook-form";
import { FieldNames } from "./enums";
import { validationSchema } from "./validations";
import { FormData } from "./interfaces";
import { UrlParams } from "enums/UrlParams";

const ChannelAddMessage = () => {
  const [channelId] = useQueryParam(UrlParams.CHANNEL_ID, StringParam);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const [channelAddMessage, { loading }] = useMutation(CHANNEL_ADD_MESSAGE);

  const onSubmit = (values: any) => {
    channelAddMessage({
      variables: {
        channelId,
        text: values.text,
      },
    });
    reset();
  };

  if (!channelId) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ChannelAddMessageBox
        width="calc(100% - 2rem)"
        height="4rem"
        background="white"
        border="1px solid"
        borderRadius="md"
        borderColor={!!errors[FieldNames.TEXT] ? "red.500" : "gray.100"}
        boxShadow="md"
        position="absolute"
        right="1rem"
        bottom="1rem"
        left="1rem"
        padding="0.5rem"
        alignItems="center"
      >
        <Input
          width="50%"
          placeholder="Write you message...."
          {...register(FieldNames.TEXT)}
        />
        <Button
          type="submit"
          isLoading={loading}
          background="purple.500"
          color="white"
          flexGrow={1}
          leftIcon={<RiSendPlaneLine />}
        />
      </ChannelAddMessageBox>
    </form>
  );
};

export default ChannelAddMessage;
