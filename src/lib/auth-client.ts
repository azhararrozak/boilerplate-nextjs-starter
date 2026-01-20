import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { organizationClient, adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: process.env.BETTER_AUTH_URL as string,
  plugins: [organizationClient(), adminClient()],
});
