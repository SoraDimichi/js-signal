export type Item = {
  name: string;
  url: string;
  trailingSlash: boolean;
  webhook: string;
  issue: number;
  updated: boolean;
  published: boolean;
};

export type Base<T extends Readonly<Array<Pick<Item, "name">>>> = {
  [K in T[number]["name"]]: number;
} & Record<string, number>;
