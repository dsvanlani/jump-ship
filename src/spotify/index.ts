import SpotifyWebApi from "spotify-web-api-node";
import { clientId, clientSecret } from "./get-credentials";

const redirectUri = "http://localhost:4444";
export let spotify = new SpotifyWebApi({
  clientId: clientId(),
  clientSecret: clientSecret(),
  redirectUri,
});
