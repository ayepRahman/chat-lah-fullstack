import React from "react";
import { Flex, Text, Divider, Link } from "@chakra-ui/react";
import GoogleAuthButton from "containers/GoogleAuthButton";
import LoginForm from "containers/LoginForm";
import RegisterForm from "containers/RegisterForm";
import AuthCard from "components/AuthCard";

const LoginCard: React.FC<{ setView: () => void }> = ({ setView }) => {
  return (
    <AuthCard>
      <Text fontSize="xl" mb="1rem">
        Login to Chat Lah
      </Text>
      <LoginForm />
      <Flex m="1rem 0" align="center">
        <Divider />
        <Text m="0 1rem" color="gray.400">
          OR
        </Text>
        <Divider />
      </Flex>
      <GoogleAuthButton>Sign in with Google</GoogleAuthButton>
      <Text textAlign="center" color="gray.400" mt="1rem">
        Not a user? <Link onClick={() => setView()}>Sign up.</Link>
      </Text>
    </AuthCard>
  );
};

const RegisterCard: React.FC<{ setView: () => void }> = ({ setView }) => {
  return (
    <AuthCard>
      <Text fontSize="xl" mb="1rem">
        Register to Chat Lah
      </Text>
      <RegisterForm registerOnCompleted={() => setView()} />
      <Flex m="1rem 0" align="center">
        <Divider />
        <Text m="0 1rem" color="gray.400">
          OR
        </Text>
        <Divider />
      </Flex>
      <GoogleAuthButton>Sign in with Google</GoogleAuthButton>
      <Text textAlign="center" color="gray.400" mt="1rem">
        Already a user? <Link onClick={() => setView()}>Login.</Link>
      </Text>
    </AuthCard>
  );
};

export enum ViewType {
  LOGIN,
  REGISTER,
}

const Login = () => {
  const [view, setView] = React.useState<ViewType>(ViewType.LOGIN);

  return (
    <Flex
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
    >
      {view === ViewType.LOGIN && (
        <LoginCard setView={() => setView(ViewType.REGISTER)} />
      )}
      {view === ViewType.REGISTER && (
        <RegisterCard setView={() => setView(ViewType.LOGIN)} />
      )}
    </Flex>
  );
};

export default Login;
