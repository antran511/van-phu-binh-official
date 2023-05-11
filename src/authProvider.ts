import { AuthBindings } from "@refinedev/core";
import { AuthHelper } from '@tspvivek/refine-directus';
import { directusClient } from './directusClient';

const directusAuthHelper = AuthHelper(directusClient);

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const { access_token } = await directusAuthHelper.login(email, password);

    if (access_token) {
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    await directusAuthHelper.logout();
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = await directusAuthHelper.getToken();
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const data = await directusAuthHelper.me({ fields: [ '*.*' ] });
    if (data) {
      return {
        id: data.id,
        name: data.name,
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
