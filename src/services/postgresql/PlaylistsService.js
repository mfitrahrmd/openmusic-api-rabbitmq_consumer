const postgrePool = require('./PostgrePool');
const { mapGetPlaylistById } = require('../../utils/mapDBToModel');

class PlaylistsService {
  constructor() {
    this._pool = postgrePool;
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: 'SELECT p.id AS "playlistId", p.name, s.id AS "songId", s.title, s.performer FROM playlists p LEFT JOIN playlists_songs ps ON ps.playlist_id = p.id LEFT JOIN songs s ON ps.song_id = s.id WHERE p.id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return mapGetPlaylistById(result.rows);
  }
}

module.exports = PlaylistsService;
