import { Item } from "./types";

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/';

export const NEWS: Item[] = [
  {
    name: 'reactnewsletter',
    url: 'https://reactnewsletter.com/issues/',
    webhook: DISCORD_WEBHOOK_URL + process.env.REACTNEWSLETTER,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: 'reactstatus',
    url: 'https://react.statuscode.com/issues/',
    webhook: DISCORD_WEBHOOK_URL + process.env.REACTSTATUS,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: 'bytes',
    url: 'https://bytes.dev/archives/',
    webhook: DISCORD_WEBHOOK_URL + process.env.BYTES,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: 'smashingmagazine',
    url: 'https://smashingmagazine.com/the-smashing-newsletter/smashing-newsletter-issue-',
    webhook: DISCORD_WEBHOOK_URL + process.env.SMASHINGMAGAZINE,
    issue: 0,
    updated: false,
    published: false,
  }
];
