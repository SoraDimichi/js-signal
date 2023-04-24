import dotenv from 'dotenv';
import { Item } from "./types.js";

dotenv.config();

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/";

const { REACTNEWSLETTER, REACTSTATUS, BYTES, SMASHINGMAGAZINE } = process.env;

export const NEWS: Item[] = [
  {
    name: "reactnewsletter",
    url: "https://reactnewsletter.com/issues/",
    webhook: DISCORD_WEBHOOK_URL + REACTNEWSLETTER,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: "reactstatus",
    url: "https://react.statuscode.com/issues/",
    webhook: DISCORD_WEBHOOK_URL + REACTSTATUS,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: "bytes",
    url: "https://bytes.dev/archives/",
    webhook: DISCORD_WEBHOOK_URL + BYTES,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: "smashingmagazine",
    url: "https://smashingmagazine.com/the-smashing-newsletter/smashing-newsletter-issue-",
    webhook: DISCORD_WEBHOOK_URL + SMASHINGMAGAZINE,
    issue: 0,
    updated: false,
    published: false,
  },
];
