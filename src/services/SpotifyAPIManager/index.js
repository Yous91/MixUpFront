import axios from 'axios';
import { spotifyTokenPremium } from '../../constants';

const API = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

API.interceptors.request.use(
  ({ headers, ...config }) => ({
    ...config,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifyTokenPremium}`,
    },
  }),
  (error) => {
    return Promise.reject(error);
  }
);

export default class SpotifyAPIManager {
  static async getTrackById(tracks) {
    const ids = tracks.map((e) => e.track_spotify_id);
    const res = await API.get(`tracks/?ids=${ids.join(',')}`);
    return res;
  }

  static async searchTrackByQuery(query) {
    const res = await API.get(`search?q=${query}&type=track&limit=5`);
    return res;
  }
}
