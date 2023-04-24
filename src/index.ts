import { access, writeFile } from "fs/promises";
import base from "./base.json" assert { type: "json" };
import { NEWS } from "./consts.js";
import { BaseData, Item } from "./types.js";
const PATH_TO_BASE = "build/base.json";

const writeToBase = async (
  data: Item[],
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

const syncWithBase = (base: BaseData, initial: Item[] = NEWS) =>
  initial.reduce((acc: Item[], item: Item) => {
    const key = item.name;
    if (!(key in base)) throw new Error(`Key ${key} not found in base`);

    return [...acc, { ...item, issue: base[key] }];
  }, []);

const checkURL = async ({ url, issue, ...p }: Item) => {
  const newIssue = issue + 1;
  const newUrl = url + newIssue;
  const { status } = await fetch(newUrl);
  return { ...p, url: newUrl, issue: newIssue, updated: status === 200 };
};

const fetchIssues = (data: Item[]) => Promise.all(data.map(checkURL));

const postToDiscord = ({ webhook, url, ...p }: Item) =>
  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: url }),
  }).then(({ status }) => ({ ...p, webhook, url, published: status === 200 }));

const postIssues = (data: Item[]) =>
  Promise.all(data.filter(({ updated }: Item) => updated).map(postToDiscord));

const runner = () =>
  Promise.resolve(syncWithBase(base))
    .then(fetchIssues)
    .then(postIssues)
    .then(writeToBase)
    .catch(console.error);

runner();