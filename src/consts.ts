import dotenv from "dotenv";
import baseData from "./base.json";
import type { Base } from "./types";

dotenv.config();

const WEBHOOK_BASE = "https://discord.com/api/webhooks/";

const { REACTNEWSLETTER, REACTSTATUS, BYTES, SMASHINGMAGAZINE, WEBSTANDARDS } =
  process.env as Record<string, string>;

export const NEWS = [
  {
    name: "reactnewsletter",
    url: "https://reactnewsletter.com/issues/",
    webhook: WEBHOOK_BASE + REACTNEWSLETTER,
    trailingSlash: false,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: "reactstatus",
    url: "https://react.statuscode.com/issues/",
    webhook: WEBHOOK_BASE + REACTSTATUS,
    trailingSlash: false,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: "bytes",
    url: "https://bytes.dev/archives/",
    webhook: WEBHOOK_BASE + BYTES,
    trailingSlash: false,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: "smashingmagazine",
    url: "https://www.smashingmagazine.com/the-smashing-newsletter/smashing-newsletter-issue-",
    webhook: WEBHOOK_BASE + SMASHINGMAGAZINE,
    trailingSlash: true,
    issue: 0,
    updated: false,
    published: false,
  },
  {
    name: "webstandards",
    url: "https://web-standards.ru/podcast/",
    webhook: WEBHOOK_BASE + WEBSTANDARDS,
    trailingSlash: true,
    issue: 0,
    updated: false,
    published: false,
  },
] as const;

export const TO_BASE = "./src/base.json";
export const ENCODE = "utf-8";
export const BASE: Base<typeof NEWS> = baseData;
