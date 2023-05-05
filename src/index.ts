import { access, writeFile } from "fs/promises";
import { get } from "https";
import { BASE, ENCODE, NEWS, TO_BASE } from "./consts";
import type { Base, Item } from "./types";

type StringifyHumanReadable = <T extends NonNullable<object>>(obj: T) => string;
const stringifyHumanReadable: StringifyHumanReadable = (obj) =>
  JSON.stringify(obj, null, 2);

type WriteToBase = (
  data: Item[],
  base?: Base<typeof NEWS>,
  path?: string
) => Promise<void>;

export const writeToBase: WriteToBase = async (
  data: Item[],
  base = BASE,
  path = TO_BASE
) => {
  await access(path).catch(() => {
    throw new Error(`writeToBase: Base in ${path} not found`);
  });

  const newBase = {
    ...base,
    ...data.reduce((acc, { name, issue }) => ({ ...acc, [name]: issue }), {}),
  };

  await writeFile(path, stringifyHumanReadable(newBase), ENCODE).catch(() => {
    throw new Error(`writeToBase: Error writing to ${path}`);
  });
};

type SyncWithBase = (
  base?: Base<typeof NEWS>,
  initial?: Readonly<Item[]>
) => Item[];

export const syncWithBase: SyncWithBase = (base = BASE, initial = NEWS) =>
  initial.reduce(
    (acc: Item[], item: Item) => [...acc, { ...item, issue: base[item.name] }],
    []
  );

const checkStatus = async (url: string): Promise<number> =>
  await new Promise((resolve, reject) => {
    get(url, ({ statusCode }) => {
      resolve(statusCode ?? 408);
    }).on("error", reject);
  });

type CheckURL = (p: Item) => Promise<Item>;
export const checkURL: CheckURL = async (p) => {
  const { url, name, issue } = p;

  const newIssue = issue + 1;
  const newUrl = `${url}${newIssue}`;

  const statusCode = await checkStatus(newUrl);

  const updated = statusCode === 200;

  console.log(`${name} was ${updated ? "" : "not "}updated to ${newIssue}`);

  return { ...p, name, updated, url: newUrl, issue };
};

type CheckIssues = (data: Item[]) => Promise<Item[]>;
export const checkIssues: CheckIssues = async (data) =>
  await Promise.all(data.map(checkURL)).catch((e: any) => {
    throw new Error(`checkIssues: ${String(e)}`);
  });

type PostToDiscord = (p: Item) => Promise<Item>;
export const postToDiscord: PostToDiscord = async (p) => {
  const { webhook, url, name, issue } = p;
  const { status } = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{"content": "${url}"}`,
  });
  const published = status === 204;

  console.log(
    `${name} ${issue} was ${published ? "" : "not "}published to Discord`
  );
  const issuePublished = published ? issue + 1 : issue;

  return { ...p, webhook, name, url, issue: issuePublished, published };
};

type PostIssues = (data: Item[]) => Promise<Item[]>;
export const postIssues: PostIssues = async (data) =>
  await Promise.all(
    data.filter(({ updated }: Item) => updated).map(postToDiscord)
  ).catch((e: any) => {
    throw new Error(`postIssues: ${String(e)}`);
  });

void (async (): Promise<void> => {
  await Promise.resolve(syncWithBase())
    .then(checkIssues)
    .then(postIssues)
    .then(writeToBase)
    .catch(console.error);
})();
