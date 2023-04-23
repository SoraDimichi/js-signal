import { readFile, writeFile } from 'fs/promises';
import { NEWS } from './consts';
import { BaseData, Item } from './types';

const PATH_TO_BASE = './base.txt';

const parseTextFileToObject = async (path = PATH_TO_BASE): Promise<BaseData> => {
  const data = await readFile(path, 'utf-8');
  return data.split('\n').reduce((acc, line) => {
    const match = line.match(/(\w+) (\d+)/);
    if (match === null) throw new Error(`Invalid: ${line}`);

    return {...acc, [match[1]]: Number(match[2])};
  }, {});
};

const writeObjectToTextFile = async (data: Item[], path = PATH_TO_BASE): Promise<void> => {
  const lines = data.map(({name, issue}) => `${name} ${issue}`);
  const content = lines.join('\n');
  await writeFile(path, content, 'utf-8');
};

const setIssue = (base: BaseData, initial: Item[] = NEWS) => initial.reduce((acc: Item[], item: Item ) => {
  const key = item.name;
  if (!(key in base)) throw new Error(`Key ${key} not found in base`);

  return [...acc, { ...item, issue: base[key]} ];
}, []);

const checkURL = ({url, issue, ...p}: Item) => {
  const newIssue = issue + 1;
  const newUrl = url + newIssue;
  return fetch(newUrl).then(() => ({...p, url: newUrl, issue: newIssue, updated: true})).catch(() => ({...p, url, issue, updated: false}));
}

const sendToDiscord = ({webhook, url, ...p}: Item) => fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: url }),
    }).then(() => ({...p, webhook, url, published: true })).catch(() => ({...p, webhook, url, published: false}));

const runner = () => parseTextFileToObject()
.then((data) => Promise.all(setIssue(data).map(checkURL)))
.then((data) => Promise.all(data.filter(({updated}: Item) => updated).map(sendToDiscord)))
.then(writeObjectToTextFile);