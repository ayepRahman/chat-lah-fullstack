import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Routes } from "enums/Routes";

const useLogout = (): { logout: () => void } => {
  const client = useApolloClient();
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    client.clearStore();
    history.push(Routes.LOGIN);
  };

  return {
    logout,
  };
};

export default useLogout;
