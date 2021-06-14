import React from "react";
import { Button, useToast, ButtonProps } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { useMutation } from "@apollo/client";
import { GOOGLE_LOGIN } from "./gql";
import { GOOGLE_CLIENT_ID } from "constants/env";
import { GetGoogleLoginData, GetGoogleLoginVar } from "./interfaces";
import { useHistory } from "react-router-dom";
import { Routes } from "enums/Routes";
import { LocalStorage } from "enums/LocalStorage";
import { ErrorMessage } from "enums/ErrorMessage";

export const GoogleAuthButton: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  const history = useHistory();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [googleAuth] = useMutation<GetGoogleLoginData, GetGoogleLoginVar>(
    GOOGLE_LOGIN,
    {
      onCompleted: ({ googleLogin }) => {
        setIsLoading(false);
        localStorage.setItem(LocalStorage.X_TOKEN, googleLogin.accessToken);
        history.push(Routes.HOME);
      },
      onError: ({ message }) => {
        toast({
          title: message,
          status: "error",
          isClosable: true,
        });
      },
    }
  );

  const handleOnSuccess = async (response: any) => {
    const idToken = response.getAuthResponse().id_token;

    googleAuth({
      variables: {
        googleIdToken: idToken,
      },
    });
  };

  const handleOnFailure = (response: any) => {
    toast({
      title: ErrorMessage.COMMON,
      status: "error",
      isClosable: true,
    });
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      onSuccess={handleOnSuccess}
      onFailure={handleOnFailure}
      onRequest={() => setIsLoading(true)}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <Button
          isFullWidth
          leftIcon={<FcGoogle />}
          bg="white"
          boxShadow="rgb(0 0 0 / 8%) 0px 0px 0.0625rem, rgb(0 0 0 / 17%) 0px 0.0625rem 0.0625rem"
          isLoading={isLoading}
          onClick={renderProps.onClick}
          {...props}
        >
          {children}
        </Button>
      )}
    />
  );
};

export default GoogleAuthButton;
