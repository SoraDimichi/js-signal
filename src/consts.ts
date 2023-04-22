const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/';

const news = {
  'https://reactnewsletter.com/issues/': DISCORD_WEBHOOK_URL + process.env.REACTNEWSLETTER,
  'https://react.statuscode.com/issues/': DISCORD_WEBHOOK_URL + process.env.REACTNEWSLETTER,
  'https://bytes.dev/archives/': DISCORD_WEBHOOK_URL + process.env.REACTNEWSLETTER,
  'https://smashingmagazine.com/the-smashing-newsletter/smashing-newsletter-issue-': DISCORD_WEBHOOK_URL + process.env.REACTNEWSLETTER
}
