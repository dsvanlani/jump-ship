import { server } from "./server";
import { spotify } from "./spotify";
import open from "open";

server.listen(4444, () => console.log("Listening on 4444."));

async function main() {
  const scopes = ["user-library-read", "user-library-modify"];
  const authorizeUrl = spotify.createAuthorizeURL(scopes, "init", true);
  open(authorizeUrl);
}

main();
