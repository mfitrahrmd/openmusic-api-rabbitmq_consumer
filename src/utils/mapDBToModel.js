const mapGetPlaylistById = (rows) =>
  rows.reduce(
    (acc, curr) => {
      acc.id = curr.playlistId;
      acc.name = curr.name;
      if (curr.songId) {
        acc.songs.push({ id: curr.songId, title: curr.title, performer: curr.performer });
      }
      return acc;
    },
    { id: null, name: null, songs: [] }
  );

module.exports = { mapGetPlaylistById };
