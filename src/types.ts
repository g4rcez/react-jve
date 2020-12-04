export type JsonItemsObject<T = any> = {
  data: T;
} & Partial<{
  onChange: (newData: T) => void;
  dateFormat: (date: Date) => string;
}>;

export type CommonProps<T = any> = {
  onChange: (newData: T) => void;
  type: Type;
  source: T;
  data: T;
  index: number;
  path: (string | number)[];
  arrayItem: boolean;
};
export type JsonEditorProps<T = any> = {
  onChange?: (newData: T) => void;
  type?: Type;
  source: T;
  data: T;
  index?: number;
  path?: (string | number)[];
  arrayItem?: boolean;
};

export enum Type {
  Obj = "object",
  Num = "number",
  Date = "date",
  Regex = "regexp",
  Null = "null",
  Undefined = "undefined",
  Str = "string",
}

export const prototype = {}.toString;
export const TYPE_REGEX = /\s([a-zA-Z]+)/

export const getType = (obj: any): string =>
  prototype
    .call(obj)
    .match(TYPE_REGEX)![1]
    .toLowerCase();

export const conversionMap = {
  [Type.Obj]: (value: string) => JSON.parse(value),
  [Type.Str]: (value: string) =>
    value === "undefined" || value === undefined ? undefined : value,
  [Type.Num]: (value: string, isInt: boolean) => {
    if (isInt) {
      return Number.parseInt(value);
    }
    const float = Number.parseFloat(value);
    if (Number.isNaN(float)) {
      return value;
    }
    return float;
  },
  [Type.Null]: (value: string) =>
    value === "null" || value === undefined ? undefined : value,
  [Type.Undefined]: (value: string) =>
    value === "undefined" || value === undefined ? undefined : value,
  [Type.Regex]: (value: string) => new RegExp(value),
  [Type.Date]: (value: string) => new Date(value),
};

export type DateFormat = (date: Date) => string;
export type OnChangeJson<T> = (date: T) => void;