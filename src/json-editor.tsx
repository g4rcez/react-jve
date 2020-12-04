import React from "react";
import { useCallback } from "react";
import { ComponentParser } from "./component-parser";
import { DateFormat, OnChangeJson } from "./types";

type Props<T = any> = {
  data: T;
} & Partial<{
  onChange: OnChangeJson<T>;
  dateFormat: DateFormat;
}>;

export const JsonEditor = <T,>({ dateFormat, onChange, ...props }: Props<T>) => {
  const dateFormatter = useCallback((date: Date) => (dateFormat ? dateFormat(date) : date.toISOString()), [dateFormat]);
  const changeJson = useCallback((data: T) => (onChange ? onChange(data) : data), [onChange]);
  return <ComponentParser onChange={changeJson} source={props.data} data={props.data} dateFormat={dateFormatter} />;
};
