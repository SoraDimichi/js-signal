import dotenv from "dotenv";
dotenv.config();

import { access, writeFile } from "fs/promises";
import baseData from "./base.json";
import { NEWS } from "./consts";
import { Base, Item } from "./types";
const PATH_TO_BASE = "build/base.json";

const b:Base<typeof NEWS> = baseData; 

export const writeToBase = async (
  data: Item[],
  base = b,
  path = PATH_TO_BASE,
  encode = "utf-8" as const
): Promise<void> => {
  try {
    access(path);
  } catch {
    throw new Error(`Base in ${path} not found`);
  }

  const newBase = {
    ...base,
    ...data.reduce((acc, { name, issue }) => ({ ...acc, [name]: issue }), {}),
  };
  await writeFile(path, JSON.stringify(newBase, null, 2), encode);
};

export const syncWithBase = (base = b, initial = NEWS) =>
  initial.reduce((acc: Item[], item: Item) => [...acc, { ...item, issue: base[item.name] }], []);

export const checkURL = async ({ url, issue, ...p }: Item) => {
  const newIssue = issue + 1;
  const newUrl = url + newIssue;
  const { status } = await fetch(newUrl);
  return { ...p, url: newUrl, issue: newIssue, updated: status === 200 };
};

export const checkIssues = (data: Item[]) => Promise.all(data.map(checkURL));

export const postToDiscord = ({ webhook, url, ...p }: Item) =>
  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: url }),
  }).then(({ status }) => ({ ...p, webhook, url, published: status === 200 }));

export const postIssues = (data: Item[]) =>
  Promise.all(data.filter(({ updated }: Item) => updated).map(postToDiscord));

export const runner = () =>
  Promise.resolve(syncWithBase())
    .then(checkIssues)
    .then(postIssues)
    .then(writeToBase)
    .catch(console.error);

runner();