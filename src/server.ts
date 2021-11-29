import express from "express";
import SpotifyWebApi from "spotify-web-api-node";
import { spotify } from "./spotify";
import { handleAuthCode } from "./spotify/utils";

const app = express();

app.get("/", async function (req, res) {
  try {
    await handleAuthCode(req);

    const spotifySongIds = await getLikedSongIds(spotify);

    res.json({ success: true, songIds: spotifySongIds });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

export const server = app;

async function getLikedSongIds(spotify: SpotifyWebApi): Promise<string[]> {
  const likedSongIDs: string[] = [];
  const limit = 20;
  let i = 0;
  while (true) {
    const res = await spotify.getMySavedTracks({ offset: limit * i, limit });
    const { items } = res.body;

    if (items.length > 0) {
      for (const item of items) {
        console.log(item.track.name);
        likedSongIDs.push(item.track.id);
      }
      i++;
    } else {
      break;
    }
  }

  return likedSongIDs;
}
