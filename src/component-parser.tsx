import React, { useMemo } from "react";
import { DateFormat, getType, JsonEditorProps, Type } from "./types";
import { MapTypes } from "./map-types";
import { Arrays } from "./arrays";

type MainProps<T> = JsonEditorProps<T> & {
  dateFormat?: DateFormat;
};

export function ComponentParser<T>(props: MainProps<T>) {
  const type: Type = useMemo(() => getType(props.data) as never, [props.data]);

  const minorProps: any = useMemo(
    () => ({
      onChange: props.onChange,
      dateFormat: props.dateFormat,
      arrayItem: props.arrayItem,
      source: props.source,
      type: type,
      path: props.path ?? [],
      index: props.index,
      data: props.data,
    }),
    [
      props.onChange,
      props.data,
      props.index,
      props.dateFormat,
      props.path,
      type,
      props.source,
      props.arrayItem,
    ]
  );

  if (Array.isArray(props.data)) {
    return <Arrays {...(minorProps as any)} />;
  }
  if (type in MapTypes) {
    const Component: React.FC = MapTypes[type] as any;
    return <Component {...minorProps} />;
  }
  return <div className="block">Confused {props.data}</div>;
}
