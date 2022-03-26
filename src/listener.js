const PlaylistsService = require('./services/postgresql/PlaylistsService');
const MailSender = require('./services/mail/MailSender');

const playlistsService = new PlaylistsService();
const mailSender = new MailSender();

async function exportPlaylist(message) {
  try {
    const { playlistId, targetEmail } = JSON.parse(message.content.toString());

    const playlistData = await playlistsService.getPlaylistById(playlistId);

    const playlist = { playlist: playlistData };

    const result = await mailSender.sendMail(targetEmail, JSON.stringify(playlist));

    console.log(`[x] Mail sent to : ${result.accepted.join(', ')}`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  exportPlaylist,
};
