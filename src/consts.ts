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
  JSTER,
  FRONTENDFOC,
  WEBTOOLSWEEKLY,
  NEWSVUEJS,
} = process.env as Record<string, string>;

export const NEWS = [
  {
    name: "newsvuejs",
    url: "https://news.vuejs.org/issues/",
    webhook: NEWSVUEJS,
    trailingSlash: false,
  },
  {
    name: "webtoolsweekly",
    url: "https://webtoolsweekly.com/archives/issue-",
    webhook: WEBTOOLSWEEKLY,
    trailingSlash: true,
  },
  {
    name: "frontendfoc",
    url: "https://frontendfoc.us/issues/",
    webhook: FRONTENDFOC,
    trailingSlash: false,
  },
  {
    name: "jster",
    url: "https://jster.net/blog/jster-",
    webhook: JSTER,
    trailingSlash: true,
  },
  {
    name: "nodeweekly",
    url: "https://nodeweekly.com/issues/",
    webhook: NODEWEEKLY,
    trailingSlash: false,
  },
  {
    name: "javascriptweekly",
    url: "https://javascriptweekly.com/issues/",
    webhook: JAVASCRIPTWEEKLY,
    trailingSlash: false,
  },
  {
    name: "graphqlweekly",
    url: "https://graphqlweekly.com/issues/",
    webhook: GRAPHQLWEEKLY,
    trailingSlash: true,
  },
  {
    name: "thisweekinreact",
    url: "https://thisweekinreact.com/newsletter/",
    webhook: THISWEEKINREACT,
    trailingSlash: false,
  },
  {
    name: "reactnewsletter",
    url: "https://reactnewsletter.com/issues/",
    webhook: REACTNEWSLETTER,
    trailingSlash: false,
  },
  {
    name: "reactstatus",
    url: "https://react.statuscode.com/issues/",
    webhook: REACTSTATUS,
    trailingSlash: false,
  },
  {
    name: "bytes",
    url: "https://bytes.dev/archives/",
    webhook: BYTES,
    trailingSlash: false,
  },
  {
    name: "smashingmagazine",
    url: "https://www.smashingmagazine.com/the-smashing-newsletter/smashing-newsletter-issue-",
    webhook: SMASHINGMAGAZINE,
    trailingSlash: true,
  },
  {
    name: "webstandards",
    url: "https://web-standards.ru/podcast/",
    webhook: WEBSTANDARDS,
    trailingSlash: true,
  },
] as const;

export const TO_BASE = "./src/base.json";
export const ENCODE = "utf-8";
export const BASE: Base<typeof NEWS> = baseData;
