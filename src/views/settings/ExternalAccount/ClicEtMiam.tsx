import { useState } from "react";
import LoginView from "@/components/Templates/LoginView";
import { Screen } from "@/router/helpers/types";
import { useAccounts, useCurrentAccount } from "@/stores/account";

import { getEstablishments, loginCredentials } from "clicetmiam-api";
import { AccountService, ClicEtMiamAccount } from "@/stores/account/types";
import uuid from "@/utils/uuid-v4";

const ExternalClicEtMiamLogin: Screen<"ExternalClicEtMiamLogin"> = ({ navigation }) => {
  const linkExistingExternalAccount = useCurrentAccount(store => store.linkExistingExternalAccount);
  const create = useAccounts(store => store.create);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string): Promise<void> => {
    setLoading(true);

    try {
      const session = await loginCredentials(username, password);

      const establishments = await getEstablishments(session);

      const new_account: ClicEtMiamAccount = {
        instance: undefined,
        service: AccountService.ClicEtMiam,
        username,
        authentication: {
          username,
          password,
          session
        },
        isExternal: true,
        localID: uuid(),
        data: {},
        favoriteSchool: establishments[0]
      };

      create(new_account);
      linkExistingExternalAccount(new_account);

      navigation.pop();
      navigation.pop();
      navigation.pop();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      else {
        setError("Une erreur est survenue lors de la connexion.");
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <LoginView
      serviceIcon={require("@/../assets/images/service_clicetmiam.png")}
      serviceName="Clic&Miam"
      onLogin={(username, password) => handleLogin(username, password)}
      loading={loading}
      error={error}
    />
  );
};

export default ExternalClicEtMiamLogin;
