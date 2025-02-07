export interface TreeNodeContent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: TreeNodeContent | any;
  files?: string[];
}
