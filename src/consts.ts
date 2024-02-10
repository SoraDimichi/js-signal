import dotenv from "dotenv";
import baseData from "./base.json";
import type { Base } from "./types";

dotenv.config();

export const WEBHOOK_BASE = "https://discord.com/api/webhooks/";

const {
  REACTNEWSLETTER,
  REACTSTATUS,
  BYTES,
  SMASHINGMAGAZINE,
  WEBSTANDARDS,
  GRAPHQLWEEKLY,
  THISWEEKINREACT,
  JAVASCRIPTWEEKLY,
  NODEWEEKLY,
  FRONTENDFOC,
  WEBTOOLSWEEKLY,
  NEWSVUEJS,
  NEXTJSWEEKLY,
} = process.env as Record<string, string>;

export const NEWS = [
  {
    name: "nextjsweekly",
    url: "https://nextjsweekly.com/issues/",
    webhook: NEXTJSWEEKLY,
  },
  {
    name: "newsvuejs",
    url: "https://news.vuejs.org/issues/",
    webhook: NEWSVUEJS,
  },
  {
    name: "webtoolsweekly",
    url: "https://webtoolsweekly.com/archives/issue-",
    webhook: WEBTOOLSWEEKLY,
  },
  {
    name: "frontendfoc",
    url: "https://frontendfoc.us/issues/",
    webhook: FRONTENDFOC,
  },
  {
    name: "nodeweekly",
    url: "https://nodeweekly.com/issues/",
    webhook: NODEWEEKLY,
  },
  {
    name: "javascriptweekly",
    url: "https://javascriptweekly.com/issues/",
    webhook: JAVASCRIPTWEEKLY,
  },
  {
    name: "graphqlweekly",
    url: "https://graphqlweekly.com/issues/",
    webhook: GRAPHQLWEEKLY,
  },
  {
    name: "thisweekinreact",
    url: "https://thisweekinreact.com/newsletter/",
    webhook: THISWEEKINREACT,
  },
  {
    name: "reactnewsletter",
    url: "https://reactnewsletter.com/issues/",
    webhook: REACTNEWSLETTER,
  },
  {
    name: "reactstatus",
    url: "https://react.statuscode.com/issues/",
    webhook: REACTSTATUS,
  },
  {
    name: "bytes",
    url: "https://bytes.dev/archives/",
    webhook: BYTES,
  },
  {
    name: "smashingmagazine",
    url: "https://www.smashingmagazine.com/the-smashing-newsletter/smashing-newsletter-issue-",
    webhook: SMASHINGMAGAZINE,
  },
  {
    name: "webstandards",
    url: "https://web-standards.ru/podcast/",
    webhook: WEBSTANDARDS,
  },
] as const;

export const TO_BASE = "./src/base.json";
export const ENCODE = "utf-8";
export const BASE: Base<typeof NEWS> = baseData;
