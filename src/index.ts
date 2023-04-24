import { writeFile } from "fs/promises";
import base from "./base.json";
import { NEWS } from "./consts";
import { BaseData, Item } from "./types";

const PATH_TO_BASE = "./base.txt";

const writeObjectToJSON = async (
  data: Item[],
  path = PATH_TO_BASE,
  encode = "utf-8" as const
): Promise<void> => {
  const newBase = data.map(({ name, issue }) => ({ [name]: issue }));
  await writeFile(path, JSON.stringify(newBase), encode);
};

const setIssue = (base: BaseData, initial: Item[] = NEWS) =>
  initial.reduce((acc: Item[], item: Item) => {
    const key = item.name;
    if (!(key in base)) throw new Error(`Key ${key} not found in base`);

    return [...acc, { ...item, issue: base[key] }];
  }, []);

const checkURL = ({ url, issue, ...p }: Item) => {
  const newIssue = issue + 1;
  const newUrl = url + newIssue;
  return fetch(newUrl)
    .then(() => ({ ...p, url: newUrl, issue: newIssue, updated: true }))
    .catch(() => ({ ...p, url, issue, updated: false }));
};

const sendToDiscord = ({ webhook, url, ...p }: Item) =>
  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: url }),
  })
    .then(() => ({ ...p, webhook, url, published: true }))
    .catch(() => ({ ...p, webhook, url, published: false }));

const runner = () => Promise.all(setIssue(base).map(checkURL))
    .then((data) =>
      Promise.all(
        data.filter(({ updated }: Item) => updated).map(sendToDiscord)
      )
    )
    .then(writeObjectToJSON);

runner();