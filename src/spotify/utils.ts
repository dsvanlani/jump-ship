import { spotify } from ".";
import { Request } from "express";
import axios from "axios";
import { clientId, clientSecret, redirectUri } from "./get-credentials";

// This gets the code from the query, then uses it to request an access
// token and then sets it on the spotify client.
export async function handleAuthCode(req: Request) {
  const code = req.query?.code as string | undefined;

  if (code != null) {
    // Request access token
    const formParams = createAuthForm(code);

    let auth = Buffer.from(`${clientId()}:${clientSecret()}`).toString(
      "base64"
    );

    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      formParams.toString(),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    spotify.setAccessToken(res.data.access_token);
    spotify.setRefreshToken(res.data.refresh_token);
  } else {
    throw new Error("Code was absent in request");
  }
}

function createAuthForm(code: string) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(),
  });

  return params;
}

/** spotify song ids */
export const spotifyLikedSongs = [];
