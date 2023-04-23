export type BaseData = {
  [key: string]: number;
}

export type Item = {
  name: string;
  url: string;
  webhook: string;
  issue: number;
  updated: boolean;
  published: boolean;
};