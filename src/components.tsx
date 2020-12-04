import { ValueContainer } from "./value-container";
import { CommonProps } from "./types";
import { useMemo } from "react";
import React from "react";

export function Numbers(props: CommonProps<number>) {
  const isInt = useMemo(() => Number.isInteger(props.data), [props.data]);
  if (isInt) {
    return (
      <ValueContainer {...props}>
        <span className="jv-label-int">int</span>
        <div className="inline-flex jv-numbers-item">{props.data}</div>
      </ValueContainer>
    );
  }
  return (
    <ValueContainer {...props}>
      <span className="jv-label-float">float</span>
      <div className="inline-flex jv-numbers-item">{props.data}</div>
    </ValueContainer>
  );
}

export function Strings(props: CommonProps<string>) {
  return (
    <ValueContainer {...props}>
      <span className="jv-label-string">string</span>
      {props.data}
    </ValueContainer>
  );
}

export function Dates(
  props: CommonProps<Date> & { dateFormat: (d: Date) => Date }
) {
  return (
    <ValueContainer {...props}>
      <span className="jv-label-date">date</span>
      <div className="inline-block jv-date-value">
        {props.dateFormat(props.data)}
      </div>
    </ValueContainer>
  );
}

export function Null(props: CommonProps<number>) {
  return (
    <ValueContainer {...props}>
      <div className="inline-block jv-null-value">null</div>
    </ValueContainer>
  );
}

export function Undefined(props: CommonProps<number>) {
  return (
    <ValueContainer {...props}>
      <div className="inline-block jv-undefined-value">undefined</div>
    </ValueContainer>
  );
}
