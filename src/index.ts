import dotenv from "dotenv";
import { access, writeFile } from "fs/promises";
import { BASE, ENCODE, NEWS, TO_BASE } from "./consts";
import type { Base, Item } from "./types";

dotenv.config();

type StringifyHumanReadable = <T extends object>(obj: T) => string;
const stringifyHumanReadable: StringifyHumanReadable = <T extends object>(
  obj: T
) => JSON.stringify(obj, null, 2);

type WriteToBase = (
  data: Item[],
  base?: Base<typeof NEWS>,
  path?: string,
  encode?: string
) => Promise<void>;

export const writeToBase: WriteToBase = async (
  data: Item[],
  base = BASE,
  path = TO_BASE
) => {
  await access(path).catch(() => {
    throw new Error(`Base in ${path} not found`);
  });

  const newBase = {
    ...base,
    ...data.reduce((acc, { name, issue }) => ({ ...acc, [name]: issue }), {}),
  };

  await writeFile(path, stringifyHumanReadable(newBase), ENCODE).catch(() => {
    throw new Error(`Error writing to ${path}`);
  });
};

export const syncWithBase = (base = BASE, initial = NEWS): Item[] =>
  initial.reduce(
    (acc: Item[], item: Item) => [...acc, { ...item, issue: base[item.name] }],
    []
  );

export const checkURL = async ({
  name,
  url,
  issue,
  ...p
}: Item): Promise<Item> => {
  const newIssue = issue + 1;
  const newUrl = `${url} + ${newIssue}`;
  const { status } = await fetch(newUrl);
  const updated = status === 200;

  console.log(
    `${name} ${issue} was ${updated ? "" : "not "}updated to ${newIssue}`
  );

  return { ...p, name, updated, url: newUrl, issue: newIssue };
};

type CheckIssues = (data: Item[]) => Promise<Item[]>;
export const checkIssues: CheckIssues = async (data) =>
  await Promise.all(data.map(checkURL)).catch((e) => { throw new Error(`checkIssues: ${e}`)});

type PostToDiscord = (p: Item) => Promise<Item>;
export const postToDiscord: PostToDiscord = async (p) => {
  const { webhook, url, name, issue } = p;
  const { status } = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: url }),
  });
  const published = status === 200;

  console.log(
    `${name} ${issue} was ${published ? "" : "not "}published to Discord`
  );
  const issueRollbacked = published ? issue : issue - 1;

  return { ...p, webhook, name, url, issue: issueRollbacked, published };
};

export const postIssues = async (data: Item[]): Promise<Item[]> =>
  await Promise.all(
    data.filter(({ updated }: Item) => updated).map(postToDiscord)
  ).catch((e) => { throw new Error(`postIssues: ${e}`)});

(async (): Promise<void> => {
  await Promise.resolve(syncWithBase())
    .then(checkIssues)
    .then(postIssues)
    .then(writeToBase)
    .catch(console.error);
})();
